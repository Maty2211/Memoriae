from django.urls import path
from .views import VistaEstadisticasPerfil

urlpatterns = [
    # Esta URL (ej: /api/profile/stats/) conectará con tu vista de estadísticas.
    path('stats/', VistaEstadisticasPerfil.as_view(), name='perfil-estadisticas'),
]

