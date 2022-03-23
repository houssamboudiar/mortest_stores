# Generated by Django 4.0.1 on 2022-03-17 20:25

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Caisse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('caisse', models.CharField(choices=[('principale', 'principale'), ('secondaire', 'secondaire')], default=1, max_length=20)),
                ('nom', models.CharField(max_length=50)),
                ('wilaya', models.CharField(max_length=50)),
                ('ville', models.CharField(max_length=50)),
                ('solde', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('montant_achats_four', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('montant_retour_four', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('montant_pay_four', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('montant_vente_client', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('montant_retour_client', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('montant_credit', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('montant_pay_client', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('montant_debit', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('montant_frais_generales', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.PositiveIntegerField()),
                ('etat_civile', models.CharField(choices=[('M.', 'M.'), ('Mme', 'Mme'), ('SARL', 'SARL'), ('EURL', 'EURL'), ('ETS', 'ETS'), ('autre', 'autre')], default=1, max_length=20)),
                ('nom', models.CharField(max_length=100)),
                ('type', models.CharField(choices=[('Détaillant', 'Détaillant'), ('Grossiste', 'Grossiste'), ('Revendeur', 'Revendeur'), ('autre', 'autre')], default=1, max_length=30)),
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
                ('saisie_par', models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
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
            name='FamilleProduit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('famille', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='FicheAchatCommandeFournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_fiche', models.CharField(choices=[('Achat', 'Achat'), ('Commande', 'Commande')], default=1, max_length=10)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('action', models.CharField(choices=[('facture', 'facture'), ('bon', 'bon'), ('bon de commande', 'bon de commande')], default=1, max_length=30)),
                ('date', models.DateField(auto_now=True)),
                ('montantregfour', models.DecimalField(decimal_places=2, max_digits=10)),
                ('mode_reglement', models.CharField(choices=[('A terme', 'A terme'), ('Espece', 'Espece'), ('Virement', 'Virement'), ('chèque', 'chèque')], default='Espece', max_length=20)),
                ('observation', models.TextField(max_length=500)),
                ('TVA', models.DecimalField(decimal_places=2, default=0, max_digits=10, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('timbre', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('remise', models.DecimalField(decimal_places=2, default=0, max_digits=10, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('caisse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.caisse')),
            ],
        ),
        migrations.CreateModel(
            name='FicheVenteClient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_fiche', models.CharField(choices=[('Bon de livraison', 'Bon de livraison'), ('Facture', 'Facture'), ('BL sans montant', 'BL sans montant'), ('Facture proformat', 'Facture proformat')], default=1, max_length=30)),
                ('type_client', models.CharField(choices=[('Bon de livraison', 'Bon de livraison'), ('Facture', 'Facture'), ('BL sans montant', 'BL sans montant'), ('Facture proformat', 'Facture proformat')], default=1, max_length=30)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('reste_a_payer', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('date', models.DateField(auto_now=True)),
                ('montant_reg_client', models.DecimalField(decimal_places=2, max_digits=10)),
                ('mode_reglement', models.CharField(choices=[('A terme', 'A terme'), ('Espece', 'Espece'), ('Virement', 'Virement'), ('chèque', 'chèque')], default=1, max_length=20)),
                ('observation', models.TextField(max_length=500)),
                ('TVA', models.DecimalField(decimal_places=2, default=0, max_digits=10, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('timbre', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('remise', models.DecimalField(decimal_places=2, default=0, max_digits=10, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('caisse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.caisse')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='core.client')),
                ('modifie_par', models.ForeignKey(default=1111, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modifie_par_vc', to=settings.AUTH_USER_MODEL)),
                ('saisie_par', models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, related_name='saisie_par_vc', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Fournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('etat_civile', models.CharField(choices=[('M.', 'M.'), ('Mme', 'Mme'), ('SARL', 'SARL'), ('EURL', 'EURL'), ('ETS', 'ETS'), ('autre', 'autre')], default='M.', max_length=20)),
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
            name='MarqueProduit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('marque', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Produit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reference', models.CharField(max_length=200)),
                ('article', models.TextField(max_length=200)),
                ('img', models.ImageField(blank=True, null=True, upload_to='images/produits/')),
                ('unit', models.CharField(choices=[('m²', 'm²'), ('m', 'm'), ('L', 'L'), ('Kg', 'Kg'), ('g', 'g')], default=1, max_length=20)),
                ('prix_U_achat', models.DecimalField(decimal_places=2, max_digits=10)),
                ('prix_detail', models.DecimalField(decimal_places=2, max_digits=10)),
                ('prix_vente_gros', models.DecimalField(decimal_places=2, max_digits=10)),
                ('prix_vente_revendeur', models.DecimalField(decimal_places=2, max_digits=10)),
                ('prix_vente_autre', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('stock_alerte', models.PositiveIntegerField(blank=True, null=True)),
                ('qtte', models.PositiveIntegerField(blank=True, null=True)),
                ('qtte_achete', models.PositiveIntegerField(blank=True, default=0)),
                ('qtte_vendue', models.PositiveIntegerField(blank=True, default=0)),
                ('qtte_retour_four', models.PositiveIntegerField(blank=True, default=0)),
                ('qtte_retour_client', models.PositiveIntegerField(blank=True, default=0)),
                ('qtte_avarie', models.PositiveIntegerField(blank=True, default=0)),
                ('ancien_prix', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('famille', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.familleproduit')),
                ('marque', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.marqueproduit')),
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
                ('identity_num', models.BigIntegerField(unique=True)),
                ('phone_number_1', models.IntegerField()),
                ('phone_number_2', models.IntegerField(blank=True, null=True)),
                ('family_situation', models.CharField(max_length=100)),
                ('admin', models.OneToOneField(default=1111, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('selling_point', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint')),
            ],
        ),
        migrations.CreateModel(
            name='Transporteur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('adress', models.CharField(max_length=100)),
                ('vehicule', models.CharField(max_length=100)),
                ('poids', models.PositiveIntegerField()),
                ('id_num', models.PositiveBigIntegerField(unique=True)),
                ('selling_point', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint')),
            ],
        ),
        migrations.CreateModel(
            name='RetoursFournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('reglement', models.CharField(choices=[('A terme', 'A terme'), ('Espece', 'Espece'), ('Virement', 'Virement'), ('chèque', 'chèque')], default=1, max_length=20)),
                ('observation', models.TextField(max_length=500)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('achat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.ficheachatcommandefournisseur')),
                ('caisse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.caisse')),
                ('fournisseur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.fournisseur')),
                ('modifie_par', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modifie_par_rf', to=settings.AUTH_USER_MODEL)),
                ('saisie_par', models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, related_name='saisie_par_rf', to=settings.AUTH_USER_MODEL)),
                ('selling_point', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint')),
            ],
        ),
        migrations.CreateModel(
            name='RetoursClient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('reglement', models.CharField(choices=[('A terme', 'A terme'), ('Espece', 'Espece'), ('Virement', 'Virement'), ('chèque', 'chèque')], default=1, max_length=20)),
                ('observation', models.TextField(max_length=500)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('caisse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.caisse')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.client')),
                ('modifie_par', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modifie_par_rc', to=settings.AUTH_USER_MODEL)),
                ('saisie_par', models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, related_name='saisie_par_rc', to=settings.AUTH_USER_MODEL)),
                ('selling_point', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint')),
                ('vente', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='retours_client', to='core.ficheventeclient')),
            ],
        ),
        migrations.CreateModel(
            name='ProduitVenteClient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite', models.DecimalField(decimal_places=2, max_digits=10)),
                ('numero_lot', models.IntegerField()),
                ('depot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.depot')),
                ('produit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='produit_vente_client', to='core.produit')),
                ('vente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='produits', to='core.ficheventeclient')),
            ],
        ),
        migrations.CreateModel(
            name='ProduitsRetourFournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite_retour', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('produit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='produit_retour_fournisseur', to='core.produit')),
                ('retour', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='produits', to='core.retoursfournisseur')),
            ],
        ),
        migrations.CreateModel(
            name='ProduitsRetourClient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite_retour', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('produit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='produit_retour_client', to='core.produit')),
                ('retour', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='produits', to='core.retoursclient')),
            ],
        ),
        migrations.CreateModel(
            name='ProduitAchatCommandeFournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite', models.DecimalField(decimal_places=2, max_digits=10)),
                ('numero_lot', models.IntegerField()),
                ('date_de_fabrication', models.DateField()),
                ('date_dexpiration', models.DateField()),
                ('unit', models.CharField(choices=[('m²', 'm²'), ('m', 'm'), ('L', 'L'), ('Kg', 'Kg'), ('g', 'g')], default='Kg', max_length=20)),
                ('achat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='produits', to='core.ficheachatcommandefournisseur')),
                ('depot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.depot')),
                ('produit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='produit_achat_fournisseur', to='core.produit')),
            ],
        ),
        migrations.AddField(
            model_name='produit',
            name='selling_point',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint'),
        ),
        migrations.CreateModel(
            name='PayementFournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=10)),
                ('reglement', models.CharField(choices=[('A terme', 'A terme'), ('Espece', 'Espece'), ('Virement', 'Virement'), ('chèque', 'chèque')], default=1, max_length=20)),
                ('observation', models.TextField(max_length=500)),
                ('achat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.ficheachatcommandefournisseur')),
                ('caisse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.caisse')),
                ('fournisseur', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='core.fournisseur')),
                ('modifie_par', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modifie_par_pf', to=settings.AUTH_USER_MODEL)),
                ('saisie_par', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='saisie_par_pf', to=settings.AUTH_USER_MODEL)),
                ('selling_point', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint')),
            ],
        ),
        migrations.CreateModel(
            name='PayementClient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=10)),
                ('reglement', models.CharField(choices=[('A terme', 'A terme'), ('Espece', 'Espece'), ('Virement', 'Virement'), ('chèque', 'chèque')], default=1, max_length=20)),
                ('observation', models.TextField(max_length=500)),
                ('achat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.ficheachatcommandefournisseur')),
                ('caisse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.caisse')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='core.client')),
                ('modilfie_par', models.ForeignKey(default=1111, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modifie_par_pc', to=settings.AUTH_USER_MODEL)),
                ('saisie_par', models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, related_name='saisie_par_pc', to=settings.AUTH_USER_MODEL)),
                ('selling_point', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint')),
            ],
        ),
        migrations.CreateModel(
            name='FraisGenerales',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('1', 'type1'), ('2', 'type2'), ('3', 'type3'), ('4', 'type4')], default=1, max_length=10)),
                ('montant', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('TVA', models.DecimalField(decimal_places=2, default=0, max_digits=10, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('timbre', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('reglement', models.CharField(choices=[('A terme', 'A terme'), ('Espece', 'Espece'), ('Virement', 'Virement'), ('chèque', 'chèque')], default='Espece', max_length=20)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('observation', models.TextField(max_length=500)),
                ('caisse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.caisse')),
                ('modifie_par', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modifie_par_fg', to=settings.AUTH_USER_MODEL)),
                ('saisie_par', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='saisie_par_fg', to=settings.AUTH_USER_MODEL)),
                ('selling_point', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint')),
            ],
        ),
        migrations.AddField(
            model_name='fournisseur',
            name='selling_point',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint'),
        ),
        migrations.AddField(
            model_name='ficheventeclient',
            name='selling_point',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='core.sellingpoint'),
        ),
        migrations.CreateModel(
            name='FicheDebit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now=True)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=10)),
                ('TVA', models.DecimalField(decimal_places=2, default=0, max_digits=5, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('reglement', models.CharField(choices=[('A terme', 'A terme'), ('Espece', 'Espece'), ('Virement', 'Virement'), ('chèque', 'chèque')], default='Espece', max_length=20)),
                ('observ', models.TextField(max_length=500)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('caisse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.caisse')),
                ('modifie_par', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modifie_par_deb', to=settings.AUTH_USER_MODEL)),
                ('saisie_par', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='saisie_par_deb', to=settings.AUTH_USER_MODEL)),
                ('selling_point', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='selling_point_fd', to='core.sellingpoint')),
            ],
        ),
        migrations.CreateModel(
            name='FicheCredit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now=True)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=10)),
                ('TVA', models.DecimalField(decimal_places=2, default=0, max_digits=5, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('reglement', models.CharField(choices=[('A terme', 'A terme'), ('Espece', 'Espece'), ('Virement', 'Virement'), ('chèque', 'chèque')], default='Espece', max_length=20)),
                ('observ', models.TextField(max_length=500)),
                ('saisie_le', models.DateField(auto_now_add=True)),
                ('modilfié_le', models.DateField(auto_now=True)),
                ('caisse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.caisse')),
                ('modifie_par', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modifie_par_cr', to=settings.AUTH_USER_MODEL)),
                ('saisie_par', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='saisie_par_cr', to=settings.AUTH_USER_MODEL)),
                ('selling_point', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='selling_point_fc', to='core.sellingpoint')),
            ],
        ),
        migrations.AddField(
            model_name='ficheachatcommandefournisseur',
            name='fournisseur',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='core.fournisseur'),
        ),
        migrations.AddField(
            model_name='ficheachatcommandefournisseur',
            name='modifie_par',
            field=models.ForeignKey(default=1111, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modifie_par_fac', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='ficheachatcommandefournisseur',
            name='saisie_par',
            field=models.ForeignKey(default=1111, on_delete=django.db.models.deletion.CASCADE, related_name='saisie_par_fac', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='ficheachatcommandefournisseur',
            name='selling_point',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='core.sellingpoint'),
        ),
        migrations.AddField(
            model_name='depot',
            name='produits',
            field=models.ManyToManyField(blank=True, related_name='produits', to='core.Produit'),
        ),
        migrations.AddField(
            model_name='depot',
            name='selling_point',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='core.sellingpoint'),
        ),
        migrations.AddField(
            model_name='client',
            name='selling_point',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint'),
        ),
        migrations.CreateModel(
            name='Clarque',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('adress', models.CharField(max_length=100)),
                ('vehicule', models.CharField(max_length=100)),
                ('poids', models.PositiveIntegerField()),
                ('id_num', models.PositiveBigIntegerField(unique=True)),
                ('selling_point', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.sellingpoint')),
            ],
        ),
        migrations.AddField(
            model_name='caisse',
            name='selling_point',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='selling_point_caisse', to='core.sellingpoint'),
        ),
        migrations.CreateModel(
            name='Avaries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qtte', models.PositiveBigIntegerField()),
                ('produit', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='core.produit')),
                ('selling_point', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='core.sellingpoint')),
            ],
        ),
    ]
