from django.shortcuts import render
from rest_framework import generics
from .models import GrupoFlashcard
from .serializer import GrupoFlashcardSerializer

def home(request):
    return render(request, 'index.html', {})

class GrupoFlashcardList(generics.ListAPIView):
    queryset = GrupoFlashcard.objects.all()
    serializer_class = GrupoFlashcardSerializer
