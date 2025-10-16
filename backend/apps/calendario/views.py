from rest_framework import viewsets, permissions
from .models import Event
from .serializer import EventSerializer
from apps.login.models import Cuenta

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            cuenta = user.cuenta
        except Cuenta.DoesNotExist:
            return Event.objects.none()
        return Event.objects.filter(cuenta=cuenta)

    def perform_create(self, serializer):
        user = self.request.user
        try:
            cuenta = user.cuenta
        except Cuenta.DoesNotExist:
            raise ValueError("El usuario no tiene cuenta asociada.")
        serializer.save(cuenta=cuenta)