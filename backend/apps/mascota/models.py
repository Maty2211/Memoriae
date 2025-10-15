from django.db import models
from django.contrib.postgres.fields import ArrayField

class Mascota(models.Model):
    nombre = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    foto = models.CharField(max_length=100)
    mensajesFijos = ["Hora de estudiar", "¡Sigue así!", "¡Te estás superando a tí mismo!", "Tu falta de compromiso me deprime", "¡Eres sorprendente!"]

    mensajes = ArrayField(
        models.CharField(max_length=100),
        default=mensajesFijos,
        editable=False,
    )

    def __str__(self):
        return self.nombre
