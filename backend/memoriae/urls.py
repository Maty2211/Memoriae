"""
URL configuration for memoriae project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.home.urls')),
    path('calendario/', include('apps.calendario.urls')),
    path('evento/', include('apps.evento.urls')),
    path('flashcard/', include('apps.flashcard.urls')),
    path('login/', include('apps.login.urls')),
    path('mascota/', include('apps.mascota.urls')),
    path('perfil/', include('apps.perfil.urls')),
    path('pomodoro/', include('apps.pomodoro.urls')),
    path('to_do_list/', include('apps.to_do_list.urls')),
]