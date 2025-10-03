from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Event

# Create your views here.

class EventView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Event.objects.all()