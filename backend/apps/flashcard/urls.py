from django.contrib import admin
from django.urls import path
from .views import GrupoFlashcardList

urlpatterns = [
    path('groups/', GrupoFlashcardList.as_view(), name='flashcard-groups'),
]