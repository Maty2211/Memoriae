from rest_framework import serializers
from .models import Event
from apps.login.models import Cuenta

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["id", "title", "start", "end", "allDay"]  # no exponemos 'cuenta'

    def _get_cuenta(self):
        user = self.context["request"].user
        try:
            return user.cuenta  # OneToOne reverse
        except Cuenta.DoesNotExist:
            return None

    def create(self, validated_data):
        cuenta = self._get_cuenta()
        if not cuenta:
            raise serializers.ValidationError("El usuario no tiene cuenta asociada.")
        validated_data["cuenta"] = cuenta
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("cuenta", None)
        return super().update(instance, validated_data)