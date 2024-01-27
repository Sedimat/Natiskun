from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class UserProfile(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Користувач")
    avatar = models.ImageField(upload_to='avatar', default='avatar/avatar_crj2ayQ.jpg')
    phone = models.CharField(max_length=13, verbose_name="Телефон")
    key = models.TextField(verbose_name="Ключ")

    def __str__(self):
        return f'Додаткова інформація'

    class Meta:
        verbose_name = "Користувач додаток"
        verbose_name_plural = "Користувачі додаток"
