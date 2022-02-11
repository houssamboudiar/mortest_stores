# Generated by Django 4.0.1 on 2022-02-11 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_remove_retoursfournisseur_depot_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='produit',
            name='qtte_achete',
            field=models.PositiveIntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='produit',
            name='qtte_avarie',
            field=models.PositiveIntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='produit',
            name='qtte_retour_client',
            field=models.PositiveIntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='produit',
            name='qtte_retour_four',
            field=models.PositiveIntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='produit',
            name='qtte_vendue',
            field=models.PositiveIntegerField(blank=True, default=0),
        ),
    ]
