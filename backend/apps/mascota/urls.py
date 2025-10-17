from django.urls import path
from .views import (
    ActualizarMascotaAPIView,
    ComprarAccesorioAPIView,
    ActualizarMonedasDesdePomodoroAPIView
)

urlpatterns = [
    path('actualizar/', ActualizarMascotaAPIView.as_view(), name='actualizar_mascota'),
    path('comprar/<int:accesorio_id>/', ComprarAccesorioAPIView.as_view(), name='comprar_accesorio'),
    path('actualizar-monedas/', ActualizarMonedasDesdePomodoroAPIView.as_view(), name='actualizar_monedas'),
]