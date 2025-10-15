from django.db import models

class GrupoFlashcard(models.Model):
    nombre = models.CharField(max_length=100)
    tema = models.CharField(max_length=100)

    class Meta:
        unique_together = ('nombre', 'tema')

    def __str__(self):
        return self.nombre

class Flashcard(models.Model):
    grupo = models.ForeignKey(GrupoFlashcard, on_delete=models.CASCADE, related_name="flashcards")
    pregunta = models.CharField(max_length=200)
    respuesta = models.TextField()

    class Meta:
        unique_together = ('grupo', 'pregunta')

    def __str__(self):
        return self.pregunta
