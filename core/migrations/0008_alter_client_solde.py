# Generated by Django 4.0.1 on 2022-04-08 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_alter_ficheventeclient_modifie_par_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='solde',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]