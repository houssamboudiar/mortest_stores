# Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from django.contrib import admin

class MyUserAdmin(UserAdmin):
    model = CustomUser

admin.site.register(CustomUser)