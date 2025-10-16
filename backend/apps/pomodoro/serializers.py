from rest_framework import serializers
from .models import PomodoroSettings, PomodoroHistory

class PomodoroSettingsSerializer(serializers.ModelSerializer):
    """Serializador para la configuración de tiempo del Pomodoro."""
    
    class Meta:
        model = PomodoroSettings
        # Excluimos 'user' porque lo gestionaremos automáticamente en la vista.
        fields = ['id', 'title', 'work_time', 'break_time', 
                  'long_break_time', 'sessions_completed', 
                  'sessions_until_long_break']
        read_only_fields = ['sessions_completed'] # El frontend no debe modificar el contador directamente.


class PomodoroHistorySerializer(serializers.ModelSerializer):
    """Serializador para registrar sesiones de Pomodoro completadas."""
    
    class Meta:
        model = PomodoroHistory
        fields = ['id', 'session_type', 'start_time', 'end_time', 
                  'duration_minutes', 'was_successful']
        read_only_fields = ['duration_minutes'] # Se calcula en la vista antes de guardar.