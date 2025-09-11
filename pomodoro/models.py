from django.db import models

class Pomodoro(models.Model):
    title = models.CharField(max_length=30, default='Configuración predetermianda')
    working_time = models.IntegerField(default=25) #Tiempo de trabajo en minutos
    break_time = models.IntegerField(default=5) #Tiempo de descanso en minutos
    sessions = models.IntegerField(default=0) #Número de sesiones (pomodoro) completadas (en minutos)

    def add_working_time(self):
        self.working_time += 5
        self.save()
    
    def subtract_working_time(self):
        if self.working_time > 5:
            self.working_time -= 5
            self.save()
    
    def add_break_time(self):
        self.break_time += 5
        self.save()
    
    def subtract_break_time(self):
        if self.break_time > 5:
            self.break_time -= 5
            self.save()

    def __str__(self):
        return self.title
