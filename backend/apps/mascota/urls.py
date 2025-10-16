from django.urls import path
from .views import ActualizarMascotaAPIView, ComprarAccesorioAPIView

urlpatterns = [
    path('actualizar/', ActualizarMascotaAPIView.as_view(), name='actualizar-mascota'),
    path('comprar/<int:accesorio_id>/', ComprarAccesorioAPIView.as_view(), name='comprar-accesorio'),
]
