# backend/apps/pomodoro/admin.py

from django.contrib import admin
from .models import PomodoroHistory # <-- 1. Importa tu modelo

# Register your models here.
admin.site.register(PomodoroHistory) # <-- 2. Registra el modelo en el admin