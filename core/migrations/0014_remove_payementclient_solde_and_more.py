# Generated by Django 4.0.1 on 2022-02-12 14:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0013_remove_ficheventeclient_solde_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payementclient',
            name='solde',
        ),
        migrations.AddField(
            model_name='payementclient',
            name='modilfie_par',
            field=models.ForeignKey(default=1111, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modifie_par_pc', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='payementclient',
            name='selling_point',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint'),
        ),
        migrations.AlterField(
            model_name='payementclient',
            name='saisie_par',
            field=models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, related_name='saisie_par_pc', to=settings.AUTH_USER_MODEL),
        ),
    ]
