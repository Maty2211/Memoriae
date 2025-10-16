from rest_framework import serializers
from .models import Mascota, Accesorio

class MascotaSerializer(serializers.ModelSerializer):
    accesorios_comprados = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True
    )
    estado_categorico = serializers.SerializerMethodField()

    class Meta:
        model = Mascota
        fields = ['id', 'nombre', 'estado', 'estado_categorico', 'foto', 'monedas', 'mensajes', 'accesorios_comprados']

    def get_estado_categorico(self, obj):
        if obj.estado < 25:
            return "Muy Bajo"
        elif obj.estado < 50:
            return "Bajo"
        elif obj.estado < 70:
            return "Medio"
        elif obj.estado < 90:
            return "Alto"
        else:
            return "Muy Alto"

class AccesorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accesorio
        fields = ['id', 'nombre', 'tipo', 'precio', 'foto']

class ComprarAccesorioSerializer(serializers.Serializer):
    accesorio_id = serializers.IntegerField()
