from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _



class CustomUser(AbstractUser):
    email = models.EmailField(_("Email Address"), unique=True)
    username = models.CharField(_("Username or Session"), unique=True, max_length=100)


    def __str__(self):
        return self.email
