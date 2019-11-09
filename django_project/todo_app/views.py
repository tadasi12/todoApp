from django.shortcuts import render
import django_filters
from rest_framework import viewsets, filters

from .models import Todo
from .serializer import TodoSerializer

from rest_framework.decorators import api_view

def index(request):                                                                                                                             
    return render(request, "index.html")

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('-created_at')
    serializer_class = TodoSerializer