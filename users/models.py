from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    # username = None
    email = models.EmailField(_('email address'), unique=True)
    user_type_data = (('1',"Directeur"),('2',"Vendeur"),('3',"Autre"))
    user_type = models.CharField(default='2',choices=user_type_data,max_length=10)

    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['user_type']

    objects = CustomUserManager()
    

    def __str__(self):
        return self.username