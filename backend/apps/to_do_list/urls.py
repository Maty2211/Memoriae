from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskView, home

router = DefaultRouter()
router.register(r'tasks', TaskView, basename='tasks')

urlpatterns = [
    path('', home, name='home'),       
    path('api/v1/', include(router.urls))
]