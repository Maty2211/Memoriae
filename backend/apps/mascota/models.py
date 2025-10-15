from django.db import models

class Mascota(models.Model):
    nombre = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    foto = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
