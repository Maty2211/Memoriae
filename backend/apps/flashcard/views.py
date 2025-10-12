from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets
from .models import GrupoFlashcard , Flashcard
from .serializer import GrupoFlashcardsSerializer , FlashcardSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class GrupoFlashcardsList(ModelViewSet):
    queryset = GrupoFlashcard.objects.all()
    serializer_class = GrupoFlashcardsSerializer

        # Acción personalizada: /grupoFlashcards/{pk}/flashcard/
    @action(detail=True, methods=['get'])
    def flashcard(self, request, pk=None):
        grupo = self.get_object()
        flashcards = Flashcard.objects.filter(grupo=grupo)
        serializer = FlashcardSerializer(flashcards, many=True)
        return Response(serializer.data)
"""
class Flashcard(ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
"""

class FlashcardViewSet(viewsets.ModelViewSet):
    serializer_class = FlashcardSerializer

    def get_queryset(self):
        grupo_id = self.kwargs.get("grupo_id")
        if grupo_id is not None:
            return Flashcard.objects.filter(grupo_id=grupo_id)
        return Flashcard.objects.all()


