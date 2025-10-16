from django.urls import path
from .views import PomodoroSettingsView, PomodoroSessionAPIView, PomodoroHistoryListView

urlpatterns = [
    #GET y PUT
    path('api/v1/settings/', PomodoroSettingsView.as_view(), name='pomodoro-settings'),
    # POST
    path('api/v1/sessions/complete/', PomodoroSessionAPIView.as_view(), name='pomodoro-session-complete'),
    # GET
    path('history/', PomodoroHistoryListView.as_view(), name='pomodoro-history'),
]