from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from .views import GoogleLogin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.views.decorators.csrf import ensure_csrf_cookie
from dj_rest_auth.jwt_auth import get_refresh_view
from django.http import HttpResponseRedirect
@ensure_csrf_cookie
def csrf(request):  # setea la cookie 'csrftoken'
    return JsonResponse({"detail": "CSRF cookie set"})

def spa_reset_redirect(request, uidb64, token):
    return HttpResponseRedirect(f"https://memoriae-web-production.up.railway.app/reset-password/confirm/{uidb64}/{token}/")

urlpatterns = [ 
    path('admin/', admin.site.urls),
    path('', include('apps.home.urls')),
    path('calendario/', include('apps.calendario.urls')),
    path('evento/', include('apps.evento.urls')),
    path('flashcard/', include('apps.flashcard.urls')),
    path('mascota/', include('apps.mascota.urls')),
    path('perfil/', include('apps.perfil.urls')),
    path('pomodoro/', include('apps.pomodoro.urls')),
    path('to_do_list/', include('apps.to_do_list.urls')),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path("dj-rest-auth/token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
    path("api/csrf/", csrf),
    path("dj-rest-auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("accounts/", include("allauth.urls")),
    path("password-reset-confirm/<uidb64>/<token>/", spa_reset_redirect, name="password_reset_confirm"),
    ##NO CREAR EL DE LOGIN PORQUE Login no tiene URLS!! Usamos los endpoints de dj-rest-auth
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)