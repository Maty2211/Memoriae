from rest_framework.routers import DefaultRouter
from .views import mascotaViewSet

router = DefaultRouter()
router.register(r'mascota', mascotaViewSet, basename="mascota")

urlpatterns = router.urls