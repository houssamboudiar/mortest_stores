# Generated by Django 4.0.1 on 2022-04-11 15:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_client_solde_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='produitventeclient',
            name='client',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.PROTECT, to='core.client'),
            preserve_default=False,
        ),
    ]
