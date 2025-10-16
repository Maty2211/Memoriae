from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import TaskSerializer
from .models import Tarea

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        cuenta = getattr(self.request.user, "cuenta", None)
        # Si no hay cuenta, devolvé vacío para evitar 500s
        if not cuenta:
            return Tarea.objects.none()
        return Tarea.objects.filter(cuenta=cuenta).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(cuenta=getattr(self.request.user, "cuenta", None))

def home(request):
    return render(request, "index.html", {})