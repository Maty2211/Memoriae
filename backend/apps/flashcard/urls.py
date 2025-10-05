from rest_framework.routers import DefaultRouter
from .views import GrupoFlashcardsList , Flashcard , FlashcardViewSet

router = DefaultRouter()
router.register(r'grupoFlashcards', GrupoFlashcardsList)
#router.register(r'flashcard', Flashcard)
router.register(r'grupoFlashcards/(?P<grupo_id>\d+)/flashcards', FlashcardViewSet, basename='grupo-flashcards-flashcards'
)

urlpatterns = router.urls