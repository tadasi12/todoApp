from rest_framework import routers
from .views import TodoViewSet
from . import views

router = routers.DefaultRouter()
router.register(r'todo', TodoViewSet)

urlpatterns = [
    path('', views.index, name='index'),                                                                                                        
]