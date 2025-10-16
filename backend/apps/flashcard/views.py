from rest_framework import viewsets, permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import GrupoFlashcard, Flashcard
from .serializer import GrupoFlashcardsSerializer, FlashcardSerializer

class GrupoFlashcardsList(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GrupoFlashcardsSerializer

    def get_queryset(self):
        cuenta = getattr(self.request.user, "cuenta", None)
        return GrupoFlashcard.objects.filter(cuenta=cuenta)

    def perform_create(self, serializer):
        serializer.save(cuenta=getattr(self.request.user, "cuenta", None))

    @action(detail=True, methods=['get'])
    def flashcard(self, request, pk=None):
        grupo = self.get_object()  # ya está filtrado por cuenta en get_queryset
        flashcards = Flashcard.objects.filter(grupo=grupo, cuenta=getattr(request.user, "cuenta", None))
        serializer = FlashcardSerializer(flashcards, many=True, context={"request": request})
        return Response(serializer.data)


class FlashcardViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FlashcardSerializer

    def get_queryset(self):
        cuenta = getattr(self.request.user, "cuenta", None)
        qs = Flashcard.objects.filter(cuenta=cuenta)
        # Si usas ruta anidada con grupo_id, filtra también:
        grupo_id = self.kwargs.get("grupo_id")
        if grupo_id is not None:
            qs = qs.filter(grupo_id=grupo_id, grupo__cuenta=cuenta)
        return qs

    def perform_create(self, serializer):
        serializer.save(cuenta=getattr(self.request.user, "cuenta", None))

