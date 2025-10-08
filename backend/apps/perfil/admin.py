from django.contrib import admin
from .models import PomodoroSettings, PomodoroHistory

admin.site.register(PomodoroSettings)
admin.site.register(PomodoroHistory)
