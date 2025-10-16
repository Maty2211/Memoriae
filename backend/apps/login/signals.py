from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Perfil, Cuenta

User = get_user_model()

@receiver(post_save, sender=User)
def create_related_on_user_create(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.get_or_create(user=instance, defaults={"nombre": "", "apellido": ""})
        Cuenta.objects.get_or_create(user=instance)