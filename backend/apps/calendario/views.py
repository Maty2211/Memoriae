from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Event

# Create your views here.

class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = TaskSerializer