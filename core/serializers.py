from rest_framework import serializers
from django.conf import settings
from users.models import CustomUser as User
from .models import (Fournisseur, SellingPoint, Caisse, Produit, Depot, FicheCredit, FicheDebit, Vendeur)
from . import models
from .custom_serializer_field import *

class SellingPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellingPoint
        fields = ['name', 'societé', 'adress', 'wilaya',
        'ville', 'telephone', 'fax', 'email', 'articles_dimposition']


class CaisseSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    class Meta:
        model = Caisse
        fields = ['selling_point', 'nom', 'caisse', 'wilaya', 'ville', 'solde']
        depth = 1


class ProduitSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(slug_field='id')
    unit_choices = (('1',"m²"),('2',"m"),('3',"L"), ('4',"Kg"), ('4',"g"))
    unit = serializers.ChoiceField(unit_choices)
    famille_choices = (('1',"1"),('2',"2"),('3',"3"), ('4',"4"), ('4',"5"))
    famille = serializers.ChoiceField(famille_choices)
    marque_choices = (('1',"1"),('2',"2"),('3',"3"), ('4',"4"), ('5',"5"))
    marque = serializers.ChoiceField(marque_choices)
    marge_vente_detail = serializers.ReadOnlyField(source='margePprixDetail')
    marge_vente_grossiste = serializers.ReadOnlyField(source='margeVenteGrossiste')
    marge_vente_revendeur = serializers.ReadOnlyField(source='margeVenteRevendeur')
    marge_vente_autre = serializers.ReadOnlyField(source='margeVenteAutre')

    class Meta:
        model = Produit
        fields = ['selling_point', 'reference', 'article', 'img', 'unit',
        'famille', 'marque', 'prix_U_achat', 'prix_detail', 'prix_vente_gros',
        'prix_vente_revendeur', 'prix_vente_autre', 'stock_alerte', 
        'stock_actuel', 'qtte', 'ancien_prix', 'marge_vente_detail', 
        'marge_vente_grossiste', 'marge_vente_revendeur', 'marge_vente_autre']
        read_only_fields = ['marge_vente_detail', 'marge_vente_grossiste',
         'marge_vente_revendeur', 'marge_vente_autre']


class DepotSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    produits = ProduitCustomRelationField(
    slug_field='id', many=True)

    class Meta:
        model = Depot
        fields = ['selling_point', 'produits', 'nom', 'adresse']
        depth = 1


class FicheCreditSerializer(serializers.ModelSerializer):
    caisse = CaisseCustomRelationField(
    slug_field='id')
    reglement_choices=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    reglement=serializers.ChoiceField(choices=reglement_choices)
    montant_tva = serializers.ReadOnlyField(source='montantTVA')
    prix_ttc = serializers.ReadOnlyField(source='prixTTC')
    # saisie_par = serializers.SlugRelatedField(queryset=User.objects.all(),
    # slug_field='id')
    class Meta:
        model = FicheCredit
        fields = ['date', 'montant', 'TVA', 'reglement', 'caisse',
        'observ', 'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par', 'montant_tva', 'prix_ttc']
        # depth = 1
        read_only_fields = ['date', 'saisie_le', 'modilfié_le', 'saisie_par']


class FicheDebitSerializer(serializers.ModelSerializer):
    caisse = CaisseCustomRelationField(
    slug_field='id')
    reglement_choices=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    reglement=serializers.ChoiceField(choices=reglement_choices)
    montant_tva = serializers.ReadOnlyField(source='montantTVA')
    prix_ttc = serializers.ReadOnlyField(source='prixTTC')
    # saisie_par = serializers.SlugRelatedField(queryset=User.objects.all(),
    # slug_field='id')
    class Meta:
        model = FicheDebit
        fields = ['date', 'montant', 'TVA', 'reglement', 'caisse',
        'observ', 'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par', 'montant_tva', 'prix_ttc']
        # depth = 1
        read_only_fields = ['date', 'saisie_le', 'modilfié_le', 'saisie_par']


class VendeurSerializer(serializers.ModelSerializer):
    selling_point = serializers.SlugRelatedField(queryset=SellingPoint.objects.all(),
    slug_field='id', required=False)
    admin = serializers.SlugRelatedField(queryset=User.objects.all(),
    slug_field='id')
    class Meta:
        model = Vendeur
        fields = ['selling_point', 'name', 'last_name', 'img',
        'identity_num', 'admin', 'phone_number_1', 'phone_number_2',
         'family_situation', 'adress']
        depth = 1


class FournisseurSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    etat_civile_data=(('1',"M."),('2',"Mme"),('3',"SARL"), ('4',"EURL"), ('5',"ETS"), ('5',"autre"),)
    etat_civile=serializers.ChoiceField(default='1', choices=etat_civile_data)
    class Meta:
        model = Fournisseur
        fields = ['selling_point', 'etat_civile', 'name',
        'telephone', 'phone_number', 'fax', 'email', 'NRC', 'NIS',
        'RIB', 'solde', 'wilaya', 'ville', 'adresse']
        depth = 1
    def create(self, validated_data):
        return Fournisseur.objects.create(**validated_data)

class FicheACFournisseurSerializer(serializers.ModelSerializer):
    
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id', required=False)
    type_fiche_choices = (('1',"Achat"),('2',"Commande"))
    type_fiche=serializers.ChoiceField(default=1,choices=type_fiche_choices)
    action_choices=(('1',"facture"),('2',"bon"),('3',"bon de commande"),)
    action=serializers.ChoiceField(default=1,choices=action_choices)
    reglement_choices=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    mode_reglement=serializers.ChoiceField(default=1,choices=reglement_choices)
    fournisseur = serializers.SlugRelatedField(queryset=models.Fournisseur.objects.all(),
    slug_field='id')
    depot = DepotCustomRelationField(slug_field='id')
    produit = ProduitCustomRelationField(
    slug_field='id', many=True)
    caisse = CaisseCustomRelationField(
    slug_field='id')
    montanttva = serializers.ReadOnlyField(source='montantTVA')
    montantremise = serializers.ReadOnlyField(source='montantRemise')
    prixttc = serializers.ReadOnlyField(source='prixTTC')

    class Meta:
        model = models.FicheAchatCommandeFournisseur
        fields = ['type_fiche', 'selling_point', 'fournisseur', 'depot',
        'saisie_le', 'modilfié_le', 'saisie_par', 'action',
         'numero', 'code', 'produit', 'quantite', 'date', 'article', 
         'numero_lot', 'date_de_fabrication', 'date_dexpiration', 
         'prix', 'unit', 'qtt_stock_actuel', 'montantregfour', 'mode_reglement',
         'caisse', 'observation', 'prixHT', 'TVA', 'timbre', 'remise', 'montanttva', 'montantremise', 'prixttc']
        
        read_only_fields = ['selling_point', 'saisie_le', 'modilfié_le', 'saisie_par']
        # depth = 1

class PayementFournisseurSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    fournisseur = serializers.SlugRelatedField(queryset=Fournisseur.objects.all(),
     slug_field='id')
    achat = AchatCustomRelationField(slug_field='id')
    reglement_data=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    reglement=serializers.ChoiceField(default=1,choices=reglement_data)
    caisse = CaisseCustomRelationField(
    slug_field='id')
    class Meta:
        model = Fournisseur
        fields = ['selling_point', 'date', 'fournisseur',
        'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par',
         'achat', 'solde', 'montant', 'solde', 'reglement', 'caisse', 'observation']
        read_only_fields = ['saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par']
        depth = 1
