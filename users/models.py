from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    date_of_birth = models.DateField(blank=True, null=True)
    
    def __str__(self) -> str:
        return f'{self.username}'