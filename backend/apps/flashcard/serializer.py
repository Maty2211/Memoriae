from rest_framework import serializers
from .models import GrupoFlashcard, Flashcard

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'pregunta', 'respuesta', 'grupo']  # no exponemos 'cuenta'

    def validate(self, attrs):
        # Validar que el grupo pertenece a la cuenta del usuario
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            cuenta = getattr(request.user, "cuenta", None)
            grupo = attrs.get("grupo") or getattr(self.instance, "grupo", None)
            if grupo and grupo.cuenta_id != getattr(cuenta, "pk", None):
                raise serializers.ValidationError("El grupo no pertenece a tu cuenta.")
        return attrs

    def create(self, validated_data):
        request = self.context["request"]
        cuenta = getattr(request.user, "cuenta", None)
        if not cuenta:
            raise serializers.ValidationError("El usuario no tiene cuenta asociada.")
        validated_data["cuenta"] = cuenta
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("cuenta", None)
        # impedir cambiar de grupo a uno de otra cuenta
        if "grupo" in validated_data:
            request = self.context.get("request")
            cuenta = getattr(request.user, "cuenta", None)
            if validated_data["grupo"].cuenta_id != getattr(cuenta, "pk", None):
                raise serializers.ValidationError("El grupo no pertenece a tu cuenta.")
        return super().update(instance, validated_data)


class GrupoFlashcardsSerializer(serializers.ModelSerializer):
    flashcards = FlashcardSerializer(many=True, read_only=True)

    class Meta:
        model = GrupoFlashcard
        fields = ['id', 'nombre', 'tema', 'flashcards']  # no exponemos 'cuenta'

    def create(self, validated_data):
        request = self.context["request"]
        cuenta = getattr(request.user, "cuenta", None)
        if not cuenta:
            raise serializers.ValidationError("El usuario no tiene cuenta asociada.")
        validated_data["cuenta"] = cuenta
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("cuenta", None)
        return super().update(instance, validated_data)