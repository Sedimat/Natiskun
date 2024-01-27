from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class UserProfile(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Користувач")
    avatar = models.ImageField(upload_to='avatar', default='avatar/avatar_crj2ayQ.jpg')
    phone = models.CharField(max_length=13, verbose_name="Телефон")
    key = models.TextField(verbose_name="Ключ")

    def __str__(self):
        return f'Додаткова інформація: {self.id_user}'

    class Meta:
        verbose_name = "Користувач додаток"
        verbose_name_plural = "Користувачі додаток"

class UserList(models.Model):
    id_user = models.ForeignKey(User,related_name='userlists_as_id_user', on_delete=models.CASCADE, verbose_name="Користувач")
    list_user = models.ForeignKey(User,related_name='userlists_as_list_user', on_delete=models.CASCADE, verbose_name="Контакт")
    status = models.CharField(max_length=1, verbose_name="Статус")

    def __str__(self):
        return f'Список користувачів: {self.id_user}'

    class Meta:
        verbose_name = "Список користувачів"
        verbose_name_plural = "Список користувачів"
