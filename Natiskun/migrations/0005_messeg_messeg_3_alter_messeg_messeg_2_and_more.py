# Generated by Django 5.0.1 on 2024-02-04 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Natiskun', '0004_messeg'),
    ]

    operations = [
        migrations.AddField(
            model_name='messeg',
            name='messeg_3',
            field=models.TextField(blank=True, verbose_name='Посилання'),
        ),
        migrations.AlterField(
            model_name='messeg',
            name='messeg_2',
            field=models.TextField(blank=True, verbose_name='Посилання Зображеня'),
        ),
        migrations.AlterField(
            model_name='messeg',
            name='user_2',
            field=models.TextField(blank=True, verbose_name='Статус чи отримав другий користувач'),
        ),
    ]
