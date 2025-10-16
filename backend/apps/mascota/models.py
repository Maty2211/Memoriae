# backend/apps/mascota/models.py

from django.db import models
from django.contrib.postgres.fields import ArrayField
from apps.login.models import Cuenta

class Accesorio(models.Model):
    TIPO_CHOICES = [
        ('tipo1', 'Tipo 1'),
        ('tipo2', 'Tipo 2'),
        ('tipo3', 'Tipo 3'),
    ]
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES, default='tipo1')
    foto = models.ImageField(upload_to='fotos_mascotas/accesorios/')
    precio = models.IntegerField()

    def __str__(self):
        return self.nombre

class Mascota(models.Model):
    cuenta = models.OneToOneField(
        Cuenta,
        on_delete=models.CASCADE,
        related_name='mascota',
        null=True,  # <-- CORRECTO: Permite migraciones limpias
        blank=True  # <-- CORRECTO: Permite que el campo esté vacío en formularios
        # <-- ELIMINADO: Se quita 'default=default_cuenta' que causaba el error.
    )
    nombre = models.CharField(max_length=100)
    estado = models.IntegerField(default=100)
    foto = models.ImageField(upload_to='fotos_mascotas/')
    monedas = models.IntegerField(default=10)

    mensajes = models.CharField(max_length=100)

    accesorios_comprados = models.ManyToManyField(
        Accesorio,
        blank=True,
        related_name='mascotas'
    )

    def __str__(self):
        return self.nombre

    def save(self, *args, **kwargs):
        if self.pk is None:
            if not self.mensajes:
                self.mensajes = [
                    "Hora de estudiar",
                    "¡Sigue asi!",
                    "¡Te estas superando a ti mismo",
                    "Tu falta de compromiso me deprime",
                    "¡Eres sorprendente!"
                ]
        super().save(*args, **kwargs)