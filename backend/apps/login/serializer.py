from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.db import transaction
from .models import Perfil, Cuenta

User = get_user_model()

class CustomRegisterSerializer(RegisterSerializer):
    #campos del form de registro
    username = serializers.CharField(required=True)
    nombre = serializers.CharField(required=False, allow_blank=True)
    apellido = serializers.CharField(required=False, allow_blank=True)
    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        # Traemos también nuestros campos
        data.update({
            "username": self.validated_data.get("username", ""),
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
        fields = ("id","username", "email", "nombre", "apellido", "monedas")
        read_only_fields = ("id", "email", "monedas", "username",)
    def get_nombre(self, obj):
        perfil = getattr(obj, "perfil", None)
        return getattr(perfil, "nombre", "") if perfil else ""

    def get_apellido(self, obj):
        perfil = getattr(obj, "perfil", None)
        return getattr(perfil, "apellido", "") if perfil else ""

    def get_monedas(self, obj):
        cuenta = getattr(obj, "cuenta", None)
        return getattr(cuenta, "monedas", 0) if cuenta else 0
    
     