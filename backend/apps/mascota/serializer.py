from rest_framework import serializers
from .models import Mascota

class MascotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mascota
        fields = ['id', 'nombre', 'estado', 'mensaje']
