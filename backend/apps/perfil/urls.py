from django.urls import path
from .views import VistaEstadisticasPerfil

urlpatterns = [
    path('stats/', VistaEstadisticasPerfil.as_view(), name='estadisticas-perfil'),
]