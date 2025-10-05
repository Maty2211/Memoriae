from rest_framework import serializers
from .models import GrupoFlashcard , Flashcard

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'pregunta', 'respuesta']

class GrupoFlashcardsSerializer(serializers.ModelSerializer):
    flashcards = FlashcardSerializer(many=True, read_only=True)
    class Meta:
        model = GrupoFlashcard
        fields = ['id', 'nombre', 'tema', 'flashcards']