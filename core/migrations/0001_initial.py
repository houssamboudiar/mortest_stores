# Generated by Django 4.0.1 on 2022-02-01 15:06

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Caisse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('caisse', models.CharField(choices=[('1', 'principale'), ('2', 'secondaire')], default=1, max_length=10)),
                ('nom', models.CharField(max_length=50)),
                ('wilaya', models.CharField(max_length=50)),
                ('ville', models.CharField(max_length=50)),
                ('solde', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.PositiveIntegerField()),
                ('etat_civile', models.CharField(choices=[('1', 'M.'), ('2', 'Mme'), ('3', 'SARL'), ('4', 'EURL'), ('5', 'ETS'), ('5', 'autre')], default=1, max_length=10)),
                ('nom', models.CharField(max_length=100)),
                ('type', models.CharField(choices=[('1', 'Détaillant'), ('2', 'Grossiste'), ('3', 'Revendeur'), ('5', 'autre')], default=1, max_length=10)),
                ('telephone', models.IntegerField(blank=True, null=True)),
                ('phone_number', models.IntegerField()),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('numero_rc', models.PositiveIntegerField(blank=True, null=True)),
                ('NRC', models.CharField(blank=True, max_length=50, null=True)),
                ('NIS', models.CharField(blank=True, max_length=50, null=True)),
                ('RIB', models.CharField(blank=True, max_length=50, null=True)),
                ('solde', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('wilaya', models.CharField(max_length=50)),
                ('ville', models.CharField(max_length=50)),
                ('adress', models.CharField(max_length=100)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Depot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('adresse', models.TextField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='FicheAchatCommandeFournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_fiche', models.CharField(choices=[('1', 'Achat'), ('2', 'Commande')], default=1, max_length=10)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('action', models.CharField(choices=[('1', 'facture'), ('2', 'bon'), ('3', 'bon de commande')], default=1, max_length=10)),
                ('numero', models.IntegerField()),
                ('code', models.IntegerField()),
                ('quantite', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date', models.DateField(auto_now=True)),
                ('article', models.CharField(max_length=10)),
                ('numero_lot', models.IntegerField()),
                ('date_de_fabrication', models.DateField()),
                ('date_dexpiration', models.DateField()),
                ('prix', models.DecimalField(decimal_places=2, max_digits=10)),
                ('unit', models.CharField(max_length=10)),
                ('qtt_stock_actuel', models.DecimalField(decimal_places=2, max_digits=5)),
                ('montantregfour', models.DecimalField(decimal_places=2, max_digits=10)),
                ('mode_reglement', models.CharField(choices=[('1', 'A terme'), ('2', 'Espece'), ('3', 'Virement'), ('4', 'chèque')], default=1, max_length=10)),
                ('observation', models.TextField(max_length=500)),
                ('prixHT', models.DecimalField(decimal_places=2, max_digits=10)),
                ('TVA', models.DecimalField(decimal_places=2, default=0, max_digits=10, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('timbre', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('remise', models.DecimalField(decimal_places=2, default=0, max_digits=10, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
            ],
        ),
        migrations.CreateModel(
            name='FicheCredit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now=True)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=10)),
                ('TVA', models.DecimalField(decimal_places=2, default=0, max_digits=5, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('reglement', models.CharField(choices=[('1', 'A terme'), ('2', 'Espece'), ('3', 'Virement'), ('4', 'chèque')], default=1, max_length=10)),
                ('observ', models.TextField(max_length=500)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='FicheDebit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now=True)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=10)),
                ('TVA', models.DecimalField(decimal_places=2, default=0, max_digits=5, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('reglement', models.CharField(choices=[('1', 'A terme'), ('2', 'Espece'), ('3', 'Virement'), ('4', 'chèque')], default=1, max_length=10)),
                ('observ', models.TextField(max_length=500)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='FicheVenteClient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_fiche', models.CharField(choices=[('1', 'Bon de livraison'), ('2', 'Facture'), ('2', 'BL sans montant'), ('2', 'Facture proformat')], default=1, max_length=10)),
                ('numero', models.IntegerField()),
                ('solde', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantite', models.DecimalField(decimal_places=2, max_digits=10)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('code', models.IntegerField()),
                ('date', models.DateField(auto_now=True)),
                ('prix', models.DecimalField(decimal_places=2, max_digits=10)),
                ('reste_a_payer', models.DecimalField(decimal_places=2, max_digits=5)),
                ('montant_reg_client', models.DecimalField(decimal_places=2, max_digits=5)),
                ('mode_reglement', models.CharField(choices=[('1', 'A terme'), ('2', 'Espece'), ('3', 'Virement'), ('4', 'chèque')], default=1, max_length=10)),
                ('observation', models.TextField(max_length=500)),
                ('prixHT', models.DecimalField(decimal_places=2, max_digits=10)),
                ('TVA', models.DecimalField(decimal_places=2, default=0, max_digits=10, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('timbre', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('remise', models.DecimalField(decimal_places=2, default=0, max_digits=10, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
            ],
        ),
        migrations.CreateModel(
            name='Fournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('etat_civile', models.CharField(choices=[('1', 'M.'), ('2', 'Mme'), ('3', 'SARL'), ('4', 'EURL'), ('5', 'ETS'), ('5', 'autre')], default=1, max_length=10)),
                ('name', models.CharField(max_length=50)),
                ('telephone', models.IntegerField(blank=True, null=True)),
                ('phone_number', models.IntegerField(blank=True, null=True)),
                ('fax', models.IntegerField(blank=True, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('NRC', models.CharField(blank=True, max_length=50, null=True)),
                ('NIS', models.CharField(blank=True, max_length=50, null=True)),
                ('RIB', models.CharField(blank=True, max_length=50, null=True)),
                ('solde', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('wilaya', models.CharField(blank=True, max_length=50, null=True)),
                ('ville', models.CharField(blank=True, max_length=50, null=True)),
                ('adresse', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FraisGenerales',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('date', models.DateField()),
                ('type', models.CharField(choices=[], default=1, max_length=10)),
                ('TVA', models.DecimalField(decimal_places=2, default=0, max_digits=10, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('timbre', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('reglement', models.CharField(choices=[('1', 'A terme'), ('2', 'Espece'), ('3', 'Virement'), ('4', 'chèque')], default=1, max_length=10)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('observation', models.TextField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='PayementClient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('solde', models.DecimalField(decimal_places=2, max_digits=10)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=10)),
                ('reglement', models.CharField(choices=[('1', 'A terme'), ('2', 'Espece'), ('3', 'Virement'), ('4', 'chèque')], default=1, max_length=10)),
                ('observation', models.TextField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='PayementFournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('solde', models.DecimalField(decimal_places=2, max_digits=10)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=5)),
                ('reglement', models.CharField(choices=[('1', 'A terme'), ('2', 'Espece'), ('3', 'Virement'), ('4', 'chèque')], default=1, max_length=10)),
                ('observation', models.TextField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Produit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reference', models.CharField(max_length=200)),
                ('article', models.TextField(max_length=200)),
                ('img', models.ImageField(blank=True, null=True, upload_to='images/produits/')),
                ('unit', models.CharField(choices=[('1', 'm²'), ('2', 'm'), ('3', 'L'), ('4', 'Kg'), ('4', 'g')], default=1, max_length=10)),
                ('famille', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('4', '5')], default=1, max_length=10)),
                ('marque', models.CharField(blank=True, choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], default=1, max_length=10, null=True)),
                ('prix_U_achat', models.DecimalField(decimal_places=2, max_digits=10)),
                ('prix_detail', models.DecimalField(decimal_places=2, max_digits=10)),
                ('prix_vente_gros', models.DecimalField(decimal_places=2, max_digits=10)),
                ('prix_vente_revendeur', models.DecimalField(decimal_places=2, max_digits=10)),
                ('prix_vente_autre', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('stock_alerte', models.PositiveIntegerField(blank=True, null=True)),
                ('stock_actuel', models.PositiveIntegerField(blank=True, null=True)),
                ('qtte', models.PositiveIntegerField(blank=True, null=True)),
                ('ancien_prix', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='RetoursClient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('qtte_achetée', models.DecimalField(decimal_places=2, max_digits=10)),
                ('qtte_retour', models.DecimalField(decimal_places=2, max_digits=10)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=10)),
                ('reglement', models.CharField(choices=[('1', 'A terme'), ('2', 'Espece'), ('3', 'Virement'), ('4', 'chèque')], default=1, max_length=10)),
                ('observation', models.TextField(max_length=500)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='RetoursFournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('qtte_achetée', models.DecimalField(decimal_places=2, max_digits=10)),
                ('qtte_retour', models.DecimalField(decimal_places=2, max_digits=10)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=10)),
                ('reglement', models.CharField(choices=[('1', 'A terme'), ('2', 'Espece'), ('3', 'Virement'), ('4', 'chèque')], default=1, max_length=10)),
                ('observation', models.TextField(max_length=500)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='SellingPoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('societé', models.CharField(max_length=100)),
                ('adress', models.CharField(max_length=200)),
                ('wilaya', models.CharField(max_length=100)),
                ('ville', models.CharField(max_length=100)),
                ('telephone', models.IntegerField()),
                ('fax', models.IntegerField()),
                ('email', models.EmailField(max_length=254)),
                ('articles_dimposition', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Vendeur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(blank=True, null=True, upload_to='images/produits/')),
                ('name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('adress', models.CharField(max_length=100)),
                ('identity_num', models.BigIntegerField()),
                ('phone_number_1', models.IntegerField()),
                ('phone_number_2', models.IntegerField(blank=True, null=True)),
                ('family_situation', models.CharField(max_length=100)),
            ],
        ),
    ]
