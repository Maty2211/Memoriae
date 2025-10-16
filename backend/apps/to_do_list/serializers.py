from rest_framework import serializers
from .models import Tarea

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ("id", "title", "description", "done")  # NO 'cuenta'

    def create(self, validated_data):
        user = self.context["request"].user
        cuenta = getattr(user, "cuenta", None)
        if not cuenta:
            raise serializers.ValidationError("El usuario no tiene cuenta asociada.")
        validated_data["cuenta"] = cuenta
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("cuenta", None)  # no permitir cambiarla
        return super().update(instance, validated_data)