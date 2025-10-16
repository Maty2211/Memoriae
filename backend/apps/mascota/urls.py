from django.urls import path
from .views import ActualizarMascotaAPIView

urlpatterns = [
    path('mascota/', ActualizarMascotaAPIView.as_view(), name='actualizar-mascota'),
]
