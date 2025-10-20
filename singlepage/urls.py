from django.urls import path
from . import views

urlpatterns = [
    path('', views.single_page, name='single_page'),
]