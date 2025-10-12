# apps/pomodoro/admin.py

from django.contrib import admin
from .models import PomodoroSettings, PomodoroHistory

# Registramos los modelos para poder verlos y editarlos en el admin
admin.site.register(PomodoroSettings)
admin.site.register(PomodoroHistory)
