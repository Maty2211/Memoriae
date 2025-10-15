from django.urls import path
from .views import PomodoroSettingsView, PomodoroSessionAPIView, PomodoroHistoryListView

urlpatterns = [
    # GET/PUT/PATCH: Para obtener y actualizar la configuración del Pomodoro
    path('api/v1/settings/', PomodoroSettingsView.as_view(), name='pomodoro-settings'),
    
    # POST: Para registrar una sesión completada (Focus, Short/Long Break)
    path('api/v1/sessions/complete/', PomodoroSessionAPIView.as_view(), name='pomodoro-session-complete'),

    # GET: Para obtener la lista de sesiones del historial
    path('history/', PomodoroHistoryListView.as_view(), name='pomodoro-history'),
]