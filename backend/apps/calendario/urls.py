from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'calendario', views.EventView, 'calendario')

urlpatterns = [
    path('api/v1/', include(router.urls))
]