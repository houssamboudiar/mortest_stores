# Generated by Django 4.0.1 on 2022-02-02 22:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0003_produit_selling_point'),
    ]

    operations = [
        migrations.AddField(
            model_name='payementfournisseur',
            name='modifie_par',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modifie_par_pf', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='payementfournisseur',
            name='selling_point',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint'),
        ),
        migrations.AlterField(
            model_name='payementfournisseur',
            name='saisie_par',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='saisie_par_pf', to=settings.AUTH_USER_MODEL),
        ),
    ]
