from rest_framework.routers import DefaultRouter
from .views import GrupoFlashcardsList , FlashcardViewSet 

router = DefaultRouter()
router.register(r'grupoFlashcards', GrupoFlashcardsList, basename="grupoFlashcards")
router.register(r'flashcard', FlashcardViewSet, basename="flashcard")

urlpatterns = router.urls