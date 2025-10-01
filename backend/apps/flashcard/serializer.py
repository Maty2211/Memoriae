from rest_framework import serializers
from .models import GrupoFlashcard

class GrupoFlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrupoFlashcard
        fields = '__all__'