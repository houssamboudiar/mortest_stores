from os import name
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('user_get_post', views.RegisterView, name='user_get_post'),
]