from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from .managers import CustomUserManager

MAX_LENGTH = 50
NAME_VALIDATOR = RegexValidator(
    r'^[a-zA-Z ]*$',
    'Only English language characters are allowed.')


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        _('email address'), 
        max_length=MAX_LENGTH,
        unique=True,
        null=False,
        blank=False
    )
    first_name = models.CharField(
        max_length=MAX_LENGTH,
        unique=False,
        null=False,
        blank=False,
        validators=[NAME_VALIDATOR]
    )
    last_name = models.CharField(
        max_length=MAX_LENGTH,
        unique=False,
        null=False,
        blank=False,
        validators=[NAME_VALIDATOR]
    )
    user_type = models.IntegerField(
        default=1,
        null=False,
        blank=False)
    date_joined = models.DateTimeField(default=timezone.now)


    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Folder(models.Model):
    user = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='folders',
        blank=True,
        null=True)
    title = models.CharField(
        max_length=MAX_LENGTH,
        unique=True,
        null=False,
        blank=False,
        validators=[NAME_VALIDATOR]
    )
    creation_date = models.DateTimeField(default=timezone.now)


class Note(models.Model):
    folder = models.ForeignKey(
        'Folder',
        on_delete=models.CASCADE,
        related_name='notes',
        blank=True,
        null=True)
    content = models.TextField(
        blank=False,
        null=False
    )
    source = models.OneToOneField(
        'Source',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='source_of'
    )
    creation_date = models.DateTimeField(default=timezone.now)


class Image(models.Model):
    folder = models.ForeignKey(
        'Folder',
        on_delete=models.CASCADE,
        related_name='images',
        blank=True,
        null=True)
    image_name = models.CharField(
        max_length=2*MAX_LENGTH,
        null=False,
        blank=False
    )
    saved_name = models.CharField(
        max_length=2*MAX_LENGTH,
        null=False,
        blank=False
    )
    creation_date = models.DateTimeField(default=timezone.now)


class Source(models.Model):
    source_type = models.CharField(
        max_length=10,
        null=False,
        blank=False
    )
    address = models.CharField(
        max_length=2*MAX_LENGTH,
        null=False,
        blank=False)
