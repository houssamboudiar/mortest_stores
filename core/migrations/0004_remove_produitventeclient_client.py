# Generated by Django 4.0.1 on 2022-04-11 21:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_produitventeclient_client'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='produitventeclient',
            name='client',
        ),
    ]
