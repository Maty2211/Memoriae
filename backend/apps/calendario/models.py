from django.db import models

class Event(models.Model):
    title  = models.CharField(max_length=200)
    start  = models.DateTimeField(blank=True, null=True)
    end    = models.DateTimeField(blank=True, null=True)
    allDay = models.BooleanField(default=False)

    # referencia “perezosa” al modelo Cuenta (app_label.ModelName)
    cuenta = models.ForeignKey(
        "login.Cuenta", on_delete=models.CASCADE, related_name="events"
    )

    def __str__(self):
        return self.title