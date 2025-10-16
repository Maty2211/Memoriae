from django.db import models
from django.conf import settings
from django.db.models import CheckConstraint, Q

class Perfil(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name="perfil",
        primary_key=True,
    )
    nombre = models.CharField(max_length=120, blank=True)
    apellido = models.CharField(max_length=120, blank=True)
    
    def __str__(self):
        return f"Perfil de {self.user}"

class Cuenta(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="cuenta",
    )
    #monedas = models.PositiveBigIntegerField(default=0)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        constraints = [
           # CheckConstraint(check=Q(monedas__gte=0), name="cuenta_balance_no_negativo"),
        ]

    def __str__(self):
        return f"Cuenta de {self.user}"
        #— {self.monedas} monedas"