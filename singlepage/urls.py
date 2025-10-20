from django.urls import path
from . import views

urlpatterns = [
    path('', views.single_page, name='single_page'),
    path('math-game/', views.math_game, name='math_game'),
]