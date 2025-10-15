from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets
from .models import Mascota
from .serializer import MascotaSerializer

class mascotaViewSet(ModelViewSet):
    queryset = Mascota.objects.all()
    serializer_class = MascotaSerializer
