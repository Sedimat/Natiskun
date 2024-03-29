from django.contrib.auth.models import User
from django.db import models

# Create your models here.



class UserList(models.Model):
    id_user = models.ForeignKey(User,related_name='userlists_as_id_user', on_delete=models.CASCADE, verbose_name="Користувач")
    list_user = models.ForeignKey(User,related_name='userlists_as_list_user', on_delete=models.CASCADE, verbose_name="Контакт")
    status = models.CharField(max_length=1, verbose_name="Статус")

    def __str__(self):
        return f'Список користувачів: {self.id_user}'

    class Meta:
        verbose_name = "Список користувачів"
        verbose_name_plural = "Список користувачів"

class Messeg(models.Model):
    key = models.TextField(max_length=16, verbose_name="Ключ")
    user_1 = models.TextField(blank=True, verbose_name="Користувач 1")
    user_2 = models.TextField(blank=True, verbose_name="Статус чи отримав другий користувач")
    messeg_1 = models.TextField(blank=True, verbose_name="Повідомленя 1")
    messeg_2 = models.TextField(blank=True, verbose_name="Посилання Зображеня")
    messeg_3 = models.TextField(blank=True, verbose_name="Посилання")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Повідомлення: {self.messeg_1}  {self.timestamp}'

    class Meta:
        verbose_name = "Повідомлення"
        verbose_name_plural = "Повідомлення"

class SoundMesseg(models.Model):
    id_m = models.ForeignKey(Messeg, on_delete=models.CASCADE, verbose_name="Повідомленя")
    file = models.FileField(upload_to='sound', default='sound/test.mp3')

    def __str__(self):
        return f'файл {self.id_m}'

    class Meta:
        verbose_name = "Звук"
        verbose_name_plural = "Звуки"

class Group(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Користувач")
    name = models.CharField(max_length=40, verbose_name="Назва")
    description = models.TextField(blank=True, verbose_name="Опис")
    fon = models.ImageField(upload_to='group', default='group/fon1.jpg')
    timestamp = models.DateTimeField(auto_now_add=True)



    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = "Група"
        verbose_name_plural = "Групи"

class GroupMesseg(models.Model):
    id_group = models.ForeignKey(Group, on_delete=models.CASCADE,verbose_name="Група")
    messeg_1 = models.TextField(blank=True, verbose_name="Повідомленя 1")
    messeg_2 = models.TextField(blank=True, verbose_name="Посилання Зображеня")
    messeg_3 = models.TextField(blank=True, verbose_name="Посилання")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Повідомлення групи'

    class Meta:
        verbose_name = "Повідомлення групи"
        verbose_name_plural = "Повідомлення групи"

class CommentsGroupMesseg(models.Model):
    id_group = models.ForeignKey(GroupMesseg, on_delete=models.CASCADE,verbose_name="Пост")
    id_user = models.ForeignKey(User, on_delete=models.CASCADE,verbose_name="Користувач")
    messeg_1 = models.TextField(blank=True, verbose_name="Повідомленя 1")
    messeg_2 = models.TextField(blank=True, verbose_name="Посилання Зображеня")
    messeg_3 = models.TextField(blank=True, verbose_name="Посилання")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Коментарі'

    class Meta:
        verbose_name = "Коментарі"
        verbose_name_plural = "Коментарі"

class UserProfile(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Користувач")
    avatar = models.ImageField(upload_to='avatar', default='avatar/avatar_crj2ayQ.jpg')
    phone = models.CharField(max_length=13, verbose_name="Телефон")
    key = models.TextField(max_length=8,verbose_name="Ключ")
    groups = models.ManyToManyField(Group, verbose_name="Групи користувача")

    def __str__(self):
        return f'Додаткова інформація: {self.id_user}'

    class Meta:
        verbose_name = "Користувач додаток"
        verbose_name_plural = "Користувачі додаток"


