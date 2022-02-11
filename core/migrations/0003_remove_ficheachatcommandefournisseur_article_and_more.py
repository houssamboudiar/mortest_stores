# Generated by Django 4.0.1 on 2022-02-09 12:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_fraisgenerales_montant'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='article',
        ),
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='code',
        ),
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='date_de_fabrication',
        ),
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='date_dexpiration',
        ),
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='depot',
        ),
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='numero_lot',
        ),
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='prix',
        ),
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='prixHT',
        ),
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='produit',
        ),
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='qtt_stock_actuel',
        ),
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='quantite',
        ),
        migrations.RemoveField(
            model_name='ficheachatcommandefournisseur',
            name='unit',
        ),
        migrations.CreateModel(
            name='ProduitAchatCommandeFournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite', models.DecimalField(decimal_places=2, max_digits=10)),
                ('numero_lot', models.IntegerField()),
                ('date_de_fabrication', models.DateField()),
                ('date_dexpiration', models.DateField()),
                ('unit', models.CharField(choices=[('1', 'm²'), ('2', 'm'), ('3', 'L'), ('4', 'Kg'), ('4', 'g')], max_length=10)),
                ('achat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.ficheachatcommandefournisseur')),
                ('depot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.depot')),
                ('produit', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='produit_achat_fournisseur', to='core.produit')),
            ],
        ),
    ]
