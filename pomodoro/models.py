from django.db import models

class Temporizador(models.Model):
    #Falta que luego vincule al usuario con el pomodoro para que pueda tener una configuración personalizada.
    title = models.CharField(max_length=100, default='Configuración predetermianda')
    category = models.CharField(max_length=50)
    #Work y Rest será los tiempos de trabajo y descando (se guardan en minutos).
    hours = models.IntegerField(default=0)
    minutes = models.IntegerField(default=25)
    seconds = models.IntegerField(default=0)
    rest = models.IntegerField(default=5)
    uuid = models.IntegerField(default=0) #A modo de víncular el temporizador con el id de un usuario

    def __str__(self):
        return self.name