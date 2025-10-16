from django.db import models
from apps.login.models import Cuenta

class PomodoroSettings(models.Model):
    cuenta = models.OneToOneField(Cuenta, on_delete=models.CASCADE, related_name='pomodoro_settings')
    title = models.CharField(max_length=50, default='Mi Temporizador Pomodoro')
    work_time = models.IntegerField(default=25)
    break_time = models.IntegerField(default=5)
    long_break_time = models.IntegerField(default=15)
    sessions_completed = models.IntegerField(default=0)
    sessions_until_long_break = models.IntegerField(default=4)
    # Metadatos
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        u = getattr(self.cuenta, "user", None)
        return f"Configuración de {getattr(u, 'username', 'usuario')}"

class PomodoroHistory(models.Model):
    # Relación con el usuario: un usuario puede tener muchas sesiones en su historial.
    cuenta = models.ForeignKey(Cuenta, on_delete=models.CASCADE, related_name='pomodoro_history')
    
    # Tipo de sesión
    SESSION_CHOICES = [
        ('work', 'Work'),
        ('short_break', 'Short Break'),
        ('long_break', 'Long Break'),
    ]
    session_type = models.CharField(max_length=15, choices=SESSION_CHOICES)
    
    # Tiempos de la sesión
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    duration_minutes = models.IntegerField(default=0) # Duración real, calculada en la vista
    
    # Estado de la sesión (ej. si se completó completamente o se interrumpió)
    was_successful = models.BooleanField(default=True)

    def __str__(self):
        u = getattr(self.cuenta, "user", None)
        username = getattr(u, "username", "usuario")
        return f"{username} - {self.get_session_type_display()} ({self.start_time.date()})"