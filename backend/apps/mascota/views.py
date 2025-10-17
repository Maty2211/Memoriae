from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Mascota, Accesorio
from .serializers import MascotaSerializer
from apps.login.models import Cuenta
from apps.pomodoro.models import PomodoroHistory  # Para obtener sesiones work
from datetime import datetime, timedelta

def _ensure_cuenta(user):
    """
    Obtiene la cuenta asociada al usuario. Si no existe, la crea.
    """
    cuenta = getattr(user, "cuenta", None)
    if cuenta is None:
        cuenta, _ = Cuenta.objects.get_or_create(user=user)
    return cuenta

class ActualizarMascotaAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Retorna los datos de la mascota asociada al usuario.
        """
        cuenta = _ensure_cuenta(request.user)
        mascota = getattr(cuenta, 'mascota', None)
        if mascota is None:
            return Response({"error": "Mascota no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        serializer = MascotaSerializer(mascota)
        return Response(serializer.data)

    def post(self, request):
        """
        Actualiza el estado de la mascota según las horas de estudio enviadas en la request.
        """
        cuenta = _ensure_cuenta(request.user)
        mascota = getattr(cuenta, 'mascota', None)
        if mascota is None:
            return Response({"error": "Mascota no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        horas_estudio = request.data.get('horas_estudio', 0)
        try:
            horas_estudio = float(horas_estudio)
        except ValueError:
            return Response({"error": "horas_estudio debe ser un número"}, status=status.HTTP_400_BAD_REQUEST)

        # Calcular estado según horas de estudio
        if horas_estudio >= 5:
            mascota.estado = 100
        elif horas_estudio >= 2:
            mascota.estado = 70
        elif horas_estudio >= 1:
            mascota.estado = 50
        else:
            mascota.estado = 25

        mascota.save()
        serializer = MascotaSerializer(mascota)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ComprarAccesorioAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, accesorio_id):
        """
        Permite a la mascota comprar un accesorio restando monedas y desbloqueándolo.
        """
        cuenta = _ensure_cuenta(request.user)
        mascota = getattr(cuenta, 'mascota', None)
        if mascota is None:
            return Response({"error": "Mascota no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        try:
            accesorio = Accesorio.objects.get(pk=accesorio_id)
        except Accesorio.DoesNotExist:
            return Response({"error": "Accesorio no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        if accesorio in mascota.accesorios_comprados.all():
            return Response({"error": "Accesorio ya desbloqueado"}, status=status.HTTP_400_BAD_REQUEST)

        if mascota.monedas < accesorio.precio:
            return Response({"error": "No tienes suficientes monedas"}, status=status.HTTP_400_BAD_REQUEST)

        # Restar monedas y desbloquear accesorio
        mascota.monedas -= accesorio.precio
        mascota.accesorios_comprados.add(accesorio)
        mascota.save()

        serializer = MascotaSerializer(mascota)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ActualizarMonedasDesdePomodoroAPIView(APIView):
    """
    Suma monedas a la mascota según el tiempo total de sesiones 'work' del día actual.
    1 minuto de 'work' = 1 moneda.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        cuenta = _ensure_cuenta(request.user)
        mascota = getattr(cuenta, 'mascota', None)
        if mascota is None:
            return Response({"error": "Mascota no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        # Obtener el rango del día actual (00:00 a 23:59)
        hoy = datetime.now().date()
        inicio_dia = datetime.combine(hoy, datetime.min.time())
        fin_dia = datetime.combine(hoy, datetime.max.time())

        # Buscar sesiones de tipo "work" del usuario durante el día actual
        sesiones = PomodoroHistory.objects.filter(
            cuenta=cuenta,
            session_type="work",
            start_time__gte=inicio_dia,
            end_time__lte=fin_dia
        )

        # Calcular minutos totales de trabajo
        total_minutos = sum(s.duration_minutes for s in sesiones)

        if total_minutos == 0:
            return Response({"mensaje": "No hay sesiones de trabajo registradas hoy."}, status=status.HTTP_200_OK)

        # Asignar monedas (1 minuto = 1 moneda)
        mascota.monedas += total_minutos
        mascota.save()

        serializer = MascotaSerializer(mascota)
        return Response({
            "mensaje": f"Se agregaron {total_minutos} monedas a la mascota.",
            "monedas_actuales": mascota.monedas,
            "mascota": serializer.data
        }, status=status.HTTP_200_OK)