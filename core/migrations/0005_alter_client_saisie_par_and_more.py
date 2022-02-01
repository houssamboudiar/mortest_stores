# Generated by Django 4.0.1 on 2022-01-30 14:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0004_alter_client_saisie_par_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='saisie_par',
            field=models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='ficheachatcommandefournisseur',
            name='saisie_par',
            field=models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='ficheventeclient',
            name='saisie_par',
            field=models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='fraisgenerales',
            name='saisie_par',
            field=models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='payementclient',
            name='saisie_par',
            field=models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='payementfournisseur',
            name='saisie_par',
            field=models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='retoursclient',
            name='saisie_par',
            field=models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='retoursfournisseur',
            name='saisie_par',
            field=models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='vendeur',
            name='admin',
            field=models.OneToOneField(default=1111, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]