from django.db import models

class Pomodoro(models.Model):
    #Falta que luego vincule al usuario con el pomodoro para que pueda tener una configuración personalizada.
    name = models.CharField(max_length=30, default='Configuración predetermianda')
    #Work y Rest será los tiempos de trabajo y descando (se guardan en minutos).
    work = models.IntegerField(default=25)
    rest = models.IntegerField(default=5)

    def __str__(self):
        return self.name
