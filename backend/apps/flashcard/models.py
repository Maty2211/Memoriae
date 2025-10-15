from django.db import models

class GrupoFlashcard(models.Model):
    nombre = models.CharField(max_length=100)
    tema = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
