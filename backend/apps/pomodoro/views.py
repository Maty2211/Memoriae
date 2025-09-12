from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from . models import Pomodoro

def home(request):
    return render(request, 'index.html', {})

def create_pomodoro(request):
    if request.method == 'POST':
        # Crea un nuevo Pomodoro con los valores por defecto 
        new_pomodoro = Pomodoro.objects.create(user=request.user)   #Paso el usuario actual como parámetrp
        return redirect('pomodoro_detail', pk=new_pomodoro.pk) # Redirige al detalle del nuevo objeto
    return render(request, 'pomodoro_widget.html', {})

def pomodoro_detail(request, pk):
    pomodoro = get_object_or_404(Pomodoro, pk=pk)
    return render(request, 'pomodoro_detail.html', {'pomodoro': pomodoro})

def add_working_time_view(request, pk):
    pomodoro = get_object_or_404(Pomodoro, pk=pk, user=request.user)
    pomodoro.add_working_time()
    return HttpResponse(pomodoro.working_time)

def subtract_working_time_view(request, pk):
    pomodoro = get_object_or_404(Pomodoro, pk=pk, user=request.user)
    pomodoro.subtract_working_time()
    return HttpResponse(pomodoro.working_time)

def add_break_time_view(request, pk):
    pomodoro = get_object_or_404(Pomodoro, pk=pk, user=request.user)
    pomodoro.add_break_time()
    return HttpResponse(pomodoro.break_time)

def subtract_break_time_view(request, pk):
    pomodoro = get_object_or_404(Pomodoro, pk=pk, user=request.user)
    pomodoro.subtract_break_time()
    return HttpResponse(pomodoro.break_time)