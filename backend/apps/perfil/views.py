from django.utils import timezone
from datetime import timedelta
from dateutil.relativedelta import relativedelta
from django.db.models import Sum
from django.db.models.functions import TruncDay
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import EstadisticasPerfilSerializer
from apps.pomodoro.models import PomodoroHistory


class VistaEstadisticasPerfil(APIView):
    permission_classes = []  # Sin autenticación por ahora

    def get(self, request, *args, **kwargs):
        hoy = timezone.now().date()

        # Obtenemos todas las sesiones exitosas
        sesiones_enfoque = PomodoroHistory.objects.filter(
            session_type='focus',
            was_successful=True
        )

        # 1. Heatmap (último año)
        hace_un_ano = hoy - timedelta(days=365)
        datos_heatmap = (
            sesiones_enfoque.filter(end_time__date__gte=hace_un_ano)
            .annotate(fecha=TruncDay('end_time'))
            .values('fecha')
            .annotate(minutos_totales=Sum('duration_minutes'))
            .order_by('fecha')
        )

        # 2. Racha diaria
        fechas_de_estudio = set(
            sesiones_enfoque.values_list('end_time__date', flat=True).distinct()
        )
        racha_de_dias = 0
        if fechas_de_estudio:
            dia_actual = hoy
            if hoy not in fechas_de_estudio:
                dia_actual -= timedelta(days=1)
            while dia_actual in fechas_de_estudio:
                racha_de_dias += 1
                dia_actual -= timedelta(days=1)

        # 3. Meta diaria
        meta_diaria_minutos = 120
        inicio_de_semana = hoy - timedelta(days=hoy.weekday())
        fin_de_semana = inicio_de_semana + timedelta(days=6)

        sesiones_esta_semana = sesiones_enfoque.filter(
            end_time__date__range=[inicio_de_semana, fin_de_semana]
        )

        estado_meta_diaria = {dia: False for dia in range(7)}
        resumen_diario = (
            sesiones_esta_semana.annotate(fecha=TruncDay('end_time'))
            .values('fecha')
            .annotate(minutos_totales=Sum('duration_minutes'))
            .order_by('fecha')
        )

        for datos_dia in resumen_diario:
            dia_de_semana = datos_dia['fecha'].weekday()
            if datos_dia['minutos_totales'] >= meta_diaria_minutos:
                estado_meta_diaria[dia_de_semana] = True

        # 4. Estadísticas semanales
        inicio_semana_pasada = inicio_de_semana - timedelta(days=7)
        fin_semana_pasada = inicio_de_semana - timedelta(days=1)

        total_semana_actual = (
            sesiones_esta_semana.aggregate(total=Sum('duration_minutes'))['total'] or 0
        )
        total_semana_anterior = (
            sesiones_enfoque.filter(
                end_time__date__range=[inicio_semana_pasada, fin_semana_pasada]
            ).aggregate(total=Sum('duration_minutes'))['total'] or 0
        )

        if total_semana_anterior > 0:
            cambio_porcentual = round(
                ((total_semana_actual - total_semana_anterior) / total_semana_anterior)
                * 100,
                1,
            )
        elif total_semana_actual > 0:
            cambio_porcentual = 100.0
        else:
            cambio_porcentual = 0.0

        # 5. Resumen mensual
        resumen_mensual = []
        for i in range(12):
            fecha_mes = hoy - relativedelta(months=i)
            nombre_mes = fecha_mes.strftime("%b")
            minutos_totales_en_mes = (
                sesiones_enfoque.filter(
                    end_time__month=fecha_mes.month,
                    end_time__year=fecha_mes.year,
                ).aggregate(total=Sum('duration_minutes'))['total'] or 0
            )
            resumen_mensual.append(
                {"mes": nombre_mes, "minutos_totales": minutos_totales_en_mes}
            )

        resumen_mensual.reverse()

        datos_respuesta = {
            "datos_heatmap": list(datos_heatmap),
            "racha_de_dias": racha_de_dias,
            "estado_meta_diaria": estado_meta_diaria,
            "estadisticas_semanales": {
                "minutos_semana_actual": total_semana_actual,
                "minutos_semana_anterior": total_semana_anterior,
                "cambio_porcentual": cambio_porcentual,
            },
            "resumen_mensual": resumen_mensual,
        }

        serializer = EstadisticasPerfilSerializer(datos_respuesta)
        return Response(serializer.data)