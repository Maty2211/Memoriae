from django.db import models

# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=200)
    start = models.DateTimeField(blank=True, null=True)
    end = models.DateTimeField(blank=True, null=True)
    allDay = models.BooleanField(default=False)

    def __str__(self):
        return self.title