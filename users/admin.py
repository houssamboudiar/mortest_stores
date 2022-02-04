from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import CustomUser as User
from core.models import Vendeur
from django import forms

from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField




admin.site.register(User)

