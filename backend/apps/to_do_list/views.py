from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializer
from .models import Tarea
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Tarea.objects.all()

def home(request):
    return render(request, 'index.html', {})
