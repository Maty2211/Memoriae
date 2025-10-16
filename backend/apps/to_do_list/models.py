from django.db import models
from apps.login.models import Cuenta

class Tarea(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    cuenta = models.ForeignKey(Cuenta, on_delete=models.CASCADE, related_name="tareas")

    def __str__(self):
        return self.title