from django.db import models
from django.contrib.auth.models import User

class PomodoroSettings(models.Model):
    # Relación con el usuario: cada usuario tiene su propia configuración.
    # Usamos OneToOneField para que un usuario solo pueda tener una configuración.
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='pomodoro_settings')
    
    # Atributos de configuración solicitados
    title = models.CharField(max_length=50, default='Mi Temporizador Pomodoro')
    focus_time = models.IntegerField(default=25)      # Tiempo de trabajo (minutos)
    break_time = models.IntegerField(default=5)         # Tiempo de descanso corto (minutos)
    long_break_time = models.IntegerField(default=15)   # Tiempo de descanso largo (minutos)
    
    # Campo para llevar la cuenta de las sesiones completadas hasta el descanso largo.
    # Esto es crucial para la lógica de tu temporizador.
    sessions_completed = models.IntegerField(default=0) 
    sessions_until_long_break = models.IntegerField(default=4) # Frecuencia del descanso largo

    # Metadatos
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Configuración de {self.user.username}"


class PomodoroHistory(models.Model):
    # Relación con el usuario: un usuario puede tener muchas sesiones en su historial.
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pomodoro_history')
    
    # Tipo de sesión
    SESSION_CHOICES = [
        ('focus', 'Focus'),
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
        return f"{self.user.username} - {self.get_session_type_display()} ({self.start_time.date()})"