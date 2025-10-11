from rest_framework import generics, permissions
from .models import PomodoroSettings, PomodoroHistory
from .serializers import PomodoroSettingsSerializer, PomodoroHistorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
import datetime


class PomodoroSettingsView(generics.RetrieveUpdateAPIView):
    """
    Permite obtener (GET) y actualizar (PUT/PATCH) la configuración del Pomodoro
    para el usuario autenticado.
    """
    serializer_class = PomodoroSettingsSerializer
    permission_classes = [permissions.IsAuthenticated] # Solo usuarios logueados

    def get_object(self):
        # Sobrescribe get_object para obtener la configuración del usuario actual.
        # Si no existe, la crea con los valores por defecto.
        settings, created = PomodoroSettings.objects.get_or_create(user=self.request.user)
        return settings


class PomodoroSessionAPIView(APIView):
    """
    Gestiona el inicio y finalización de las sesiones de Pomodoro
    y actualiza el contador del usuario.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """Endpoint para registrar una sesión completada (Focus, Short/Long Break)."""
        session_type = request.data.get('session_type')
        start_time_str = request.data.get('start_time')
        end_time_str = request.data.get('end_time')

        # Validación básica de datos
        if not all([session_type, start_time_str, end_time_str]):
             return Response({"error": "Faltan datos de tiempo o tipo de sesión."}, 
                             status=status.HTTP_400_BAD_REQUEST)

        # Convertir strings a objetos datetime
        start_time = datetime.datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))
        end_time = datetime.datetime.fromisoformat(end_time_str.replace('Z', '+00:00'))
        
        # 1. Crear el registro de historial
        session = PomodoroHistory.objects.create(
            user=request.user,
            session_type=session_type,
            start_time=start_time,
            end_time=end_time,
            was_successful=True, # Asumimos que si llega aquí, se completó
            duration_minutes=(end_time - start_time).seconds // 60 
        )

        # 2. Actualizar el contador de sesiones completadas (solo si es una sesión de 'focus')
        if session_type == 'focus':
            settings = PomodoroSettings.objects.get(user=request.user)
            settings.sessions_completed += 1
            # Lógica para reiniciar el contador si se alcanza el descanso largo:
            if settings.sessions_completed >= settings.sessions_until_long_break:
                settings.sessions_completed = 0 # Reiniciar contador
            settings.save()

        return Response(PomodoroHistorySerializer(session).data, status=status.HTTP_201_CREATED)