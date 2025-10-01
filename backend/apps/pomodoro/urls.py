from django.urls import path
from .views import PomodoroSettingsView, PomodoroSessionAPIView

urlpatterns = [
    # GET/PUT/PATCH: Para obtener y actualizar la configuración del Pomodoro
    path('settings/', PomodoroSettingsView.as_view(), name='pomodoro-settings'),
    
    # POST: Para registrar una sesión completada (Focus, Short/Long Break)
    path('sessions/complete/', PomodoroSessionAPIView.as_view(), name='pomodoro-session-complete'),
]