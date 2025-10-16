from rest_framework import serializers
from .models import PomodoroSettings, PomodoroHistory

class PomodoroSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PomodoroSettings
        fields = ['id', 'title', 'work_time', 'break_time', 
                  'long_break_time', 'sessions_completed', 
                  'sessions_until_long_break']
        read_only_fields = ['sessions_completed']


class PomodoroHistorySerializer(serializers.ModelSerializer):  
    class Meta:
        model = PomodoroHistory
        fields = ['id', 'session_type', 'start_time', 'end_time', 
                  'duration_minutes', 'was_successful']
        read_only_fields = ['duration_minutes']