from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from django.apps import apps
from rest_framework import serializers
from django.db import transaction
from .models import Perfil, Cuenta

class CustomRegisterSerializer(RegisterSerializer):
    #campos del form de registro
    nombre = serializers.CharField(required=False, allow_blank=True)
    apellido = serializers.CharField(required=False, allow_blank=True)
    
    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        # Traemos también nuestros campos
        data.update({
            "nombre": self.validated_data.get("nombre", ""),
            "apellido": self.validated_data.get("apellido", ""),
        })
        return data
        
    def save(self, request):
        with transaction.atomic():
            user = super().save(request)
            cleaned = self.get_cleaned_data()
            Perfil.objects.update_or_create(
                user=user,
                defaults={
                    "nombre": cleaned.get("nombre", ""),
                    "apellido": cleaned.get("apellido", ""),
                },
        )
            Cuenta.objects.get_or_create(user=user, defaults={"monedas": 0}
            )
        return user 

class UserMeSerializer(serializers.ModelSerializer):
    # leo/escribo en Perfil
    nombre = serializers.CharField(source="perfil.nombre", required=False, allow_blank=True)
    apellido = serializers.CharField(source="perfil.apellido", required=False, allow_blank=True)
    # solo lectura desde Cuenta
    monedas = serializers.IntegerField(source="cuenta.monedas", read_only=True)

    class Meta:
        model = get_user_model()
        fields = ("id", "email", "nombre", "apellido", "monedas")
        read_only_fields = ("id", "email", "monedas")

    def update(self, instance, validated_data):
        # si hacen PATCH /dj-rest-auth/user/ con nombre/apellido, actualizo Perfil
        perfil_data = validated_data.pop("perfil", {})
        # (cuenta/monedas quedan read-only)
        for attr, val in validated_data.items():
            setattr(instance, attr, val)  # por si algún día querés editar algo del User
        instance.save()

        # crear/actualizar Perfil de forma segura
        Perfil = apps.get_model("apps.login", "Perfil")
        if perfil_data:
            Perfil.objects.update_or_create(user=instance, defaults=perfil_data)
        return instance