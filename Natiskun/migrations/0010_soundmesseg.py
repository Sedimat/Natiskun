# Generated by Django 5.0.1 on 2024-02-20 15:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Natiskun', '0009_alter_groupmesseg_id_group_commentsgroupmesseg'),
    ]

    operations = [
        migrations.CreateModel(
            name='SoundMesseg',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(default='sound/test.mp3', upload_to='sound')),
                ('id_m', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Natiskun.messeg', verbose_name='Повідомленя')),
            ],
            options={
                'verbose_name': 'Звук',
                'verbose_name_plural': 'Звуки',
            },
        ),
    ]
