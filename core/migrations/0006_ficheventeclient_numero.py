# Generated by Django 4.0.1 on 2022-04-08 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_avaries_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='ficheventeclient',
            name='numero',
            field=models.PositiveIntegerField(default=1),
        ),
    ]
