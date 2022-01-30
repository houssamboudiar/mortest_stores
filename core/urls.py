from os import name
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('sp_get_post', views.sellingPointGETPOST, name='sp_get_post'),
    path('sp_pk/<int:pk>', views.sellingPointPk, name='sp_pk'),
    path('caisse_get_post', views.caisseGETPOST, name='caisse_get_post'),
    path('caisse_pk/<int:pk>', views.caissePk, name='caisse_pk'),

]