from django.db import models
from apps.login.models import Cuenta

class GrupoFlashcard(models.Model):
    nombre = models.CharField(max_length=100)
    tema = models.CharField(max_length=100)
    cuenta = models.ForeignKey(Cuenta, on_delete=models.CASCADE, related_name="grupos_flashcard")

    class Meta:
        unique_together = ('nombre', 'tema')

    def __str__(self):
        return self.nombre

class Flashcard(models.Model):
    grupo = models.ForeignKey(GrupoFlashcard, on_delete=models.CASCADE, related_name="flashcards")
    pregunta = models.CharField(max_length=200)
    respuesta = models.TextField()
    cuenta = models.ForeignKey(Cuenta, on_delete=models.CASCADE, related_name="flashcards")

    class Meta:
        unique_together = ('grupo', 'pregunta')

    def __str__(self):
        return self.pregunta