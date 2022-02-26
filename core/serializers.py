from rest_framework import serializers
from django.conf import settings
from users.models import CustomUser as User
from .models import (Fournisseur, PayementClient, ProduitAchatCommandeFournisseur, SellingPoint, Caisse, Produit, Depot, FicheCredit, FicheDebit, Vendeur)
from . import models
from .custom_serializer_field import *
from drf_writable_nested.serializers import WritableNestedModelSerializer

class SellingPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellingPoint
        fields = ['id', 'name', 'societé', 'adress', 'wilaya',
        'ville', 'telephone', 'fax', 'email', 'articles_dimposition']


class CaisseSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    class Meta:
        model = Caisse
        fields = ['id', 'selling_point', 'nom', 'caisse', 'wilaya',
         'ville', 'solde', 'montant_achats_four', 'montant_retour_four',
          'montant_pay_four', 'montant_vente_client', 'montant_retour_client',
          'montant_credit', 'montant_pay_client', 'montant_debit', 'montant_frais_generales', 'somme']
        read_only_fields = ['montant_achats_four', 'montant_retour_four',
          'montant_pay_four', 'montant_vente_client', 'montant_retour_client',
          'montant_credit', 'montant_pay_client', 'montant_debit', 'montant_frais_generales', 'somme']
        depth = 1


class ProduitSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(slug_field='id')
    unit_choices = (('m²',"m²"),('m',"m"),('L',"L"), ('Kg',"Kg"), ('g',"g"))
    unit = serializers.ChoiceField(unit_choices)
    famille = serializers.SlugRelatedField(queryset=models.FamilleProduit.objects.all(), slug_field='id')
    marque = serializers.SlugRelatedField(queryset=models.MarqueProduit.objects.all(), slug_field='id')
    marge_vente_detail = serializers.ReadOnlyField(source='margePprixDetail')
    marge_vente_grossiste = serializers.ReadOnlyField(source='margeVenteGrossiste')
    marge_vente_revendeur = serializers.ReadOnlyField(source='margeVenteRevendeur')
    marge_vente_autre = serializers.ReadOnlyField(source='margeVenteAutre')
    qtte_actuel_stock = serializers.ReadOnlyField(source='qtteActuelStock')

    class Meta:
        model = Produit
        fields = ['id','selling_point', 'reference', 'article', 'img', 'unit',
        'famille', 'marque', 'prix_U_achat', 'prix_detail', 'prix_vente_gros',
        'prix_vente_revendeur', 'prix_vente_autre', 'stock_alerte', 
         'qtte', 'ancien_prix', 'marge_vente_detail', 
        'marge_vente_grossiste', 'marge_vente_revendeur', 'marge_vente_autre', 'qtte_actuel_stock',
        'qtte_achete', 'qtte_vendue', 'qtte_retour_four', 'qtte_retour_client', 'qtte_avarie']
        read_only_fields = ['marge_vente_detail', 'marge_vente_grossiste',
         'marge_vente_revendeur', 'marge_vente_autre', 'qtte_achete', 'qtte_vendue',
          'qtte_retour_four', 'qtte_retour_client', 'qtte_avarie']

class AvariesSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    produit = ProduitCustomRelationField(slug_field='id')
    depoot = serializers.ReadOnlyField(source='depot')
    prix_prod = serializers.ReadOnlyField(source='prix_u')

    class Meta:
        model = models.Avaries
        fields = ['id','selling_point', 'produit', 'qtte', 'depoot',
        'prix_prod']
        depth = 1


class DepotSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    produits = ProduitCustomRelationField(
    slug_field='id', many=True)

    class Meta:
        model = Depot
        fields = ['id','selling_point', 'produits', 'nom', 'adresse']
        depth = 1


class FicheCreditSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(slug_field='id')
    caisse = CaisseCustomRelationField(
    slug_field='id')
    reglement_choices=(('A terme',"A terme"),('Espece',"Espece"),('Virement',"Virement"), ('chèque',"chèque"),)
    reglement=serializers.ChoiceField(choices=reglement_choices)
    montant_tva = serializers.ReadOnlyField(source='montantTVA')
    prix_ttc = serializers.ReadOnlyField(source='prixTTC')
    # saisie_par = serializers.SlugRelatedField(queryset=User.objects.all(),
    # slug_field='id')
    class Meta:
        model = FicheCredit
        fields = ['id', 'selling_point', 'date', 'montant', 'TVA', 'reglement', 'caisse',
        'observ', 'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par', 'montant_tva', 'prix_ttc']
        # depth = 1
        read_only_fields = ['date', 'saisie_le', 'modilfié_le', 'saisie_par']


class FicheDebitSerializer(serializers.ModelSerializer):
    caisse = CaisseCustomRelationField(
    slug_field='id')
    reglement_choices=(('A terme',"A terme"),('Espece',"Espece"),('Virement',"Virement"), ('chèque',"chèque"),)
    reglement=serializers.ChoiceField(choices=reglement_choices)
    montant_tva = serializers.ReadOnlyField(source='montantTVA')
    prix_ttc = serializers.ReadOnlyField(source='prixTTC')
    # saisie_par = serializers.SlugRelatedField(queryset=User.objects.all(),
    # slug_field='id')
    class Meta:
        model = FicheDebit
        fields = ['id', 'date', 'montant', 'TVA', 'reglement', 'caisse',
        'observ', 'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par', 'montant_tva', 'prix_ttc']
        # depth = 1
        read_only_fields = ['date', 'saisie_le', 'modilfié_le', 'saisie_par']

class FraisGeneralesSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    date = serializers.DateField()
    caisse = CaisseCustomRelationField(
    slug_field='id')
    type_data=(('1',"type1"),('2',"type2"),('3',"type3"), ('4',"type4"),)
    type=serializers.ChoiceField(default=1,choices=type_data)
    reglement_choices=(('A terme',"A terme"),('Espece',"Espece"),('Virement',"Virement"), ('chèque',"chèque"),)
    reglement=serializers.ChoiceField(choices=reglement_choices)
    montant_tva = serializers.ReadOnlyField(source='montantTVA')
    prix_ttc = serializers.ReadOnlyField(source='prixTTC')
    # saisie_par = serializers.SlugRelatedField(queryset=User.objects.all(),
    # slug_field='id')
    class Meta:
        model = models.FraisGenerales
        fields = ['id','selling_point', 'number', 'date', 'type', 'caisse', 'montant',
        'observation', 'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par', 'montant_tva',
         'prix_ttc', 'montant', 'timbre', 'reglement']
        # depth = 1
        read_only_fields = ['date', 'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par']

class VendeurSerializer(serializers.ModelSerializer):
    selling_point = serializers.SlugRelatedField(queryset=SellingPoint.objects.all(),
    slug_field='id', required=False)
    admin = serializers.SlugRelatedField(queryset=User.objects.all(),
    slug_field='id')
    class Meta:
        model = Vendeur
        fields = ['id','selling_point', 'name', 'last_name', 'img',
        'identity_num', 'admin', 'phone_number_1', 'phone_number_2',
         'family_situation', 'adress']
        depth = 1


class FournisseurSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    etat_civile_data=(('M.',"M."),('Mme',"Mme"),('SARL',"SARL"), ('EURL',"EURL"), ('ETS',"ETS"), ('autre',"autre"),)
    etat_civile=serializers.ChoiceField(default='1', choices=etat_civile_data)
    class Meta:
        model = Fournisseur
        fields = ['id','selling_point', 'etat_civile', 'name',
        'telephone', 'phone_number', 'fax', 'email', 'NRC', 'NIS',
        'RIB', 'solde', 'wilaya', 'ville', 'adresse']
        depth = 1
    def create(self, validated_data):
        return Fournisseur.objects.create(**validated_data)

class ProduitAchatCommandeFournisseurSerializer(serializers.ModelSerializer):
    produit = ProduitCustomRelationField(slug_field='id')
    depot = DepotCustomRelationField(slug_field='id')
    date_de_fabrication = serializers.DateField()
    date_dexpiration = serializers.DateField()
    unit_choices = (('m²',"m²"),('m',"m"),('L',"L"), ('Kg',"Kg"), ('g',"g"))
    unit = serializers.ChoiceField(unit_choices)
    prix = serializers.ReadOnlyField(source='prixProduit')
    qtteAct = serializers.ReadOnlyField(source='qtteActProduit')

    class Meta:
        model = models.ProduitAchatCommandeFournisseur
        fields = ['id','depot', 'produit', 'quantite', 'numero_lot', 'date_de_fabrication',
        'date_dexpiration', 'unit', 'prix', 'qtteAct']

class FicheACFournisseurSerializer(WritableNestedModelSerializer):
    produits = ProduitAchatCommandeFournisseurSerializer(many=True)
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id', required=False)
    # type_fiche_choices = (('1',"Achat"),('2',"Commande"))
    # type_fiche=serializers.ChoiceField(default=1,choices=type_fiche_choices)
    action_choices=(('facture',"facture"),('bon',"bon"),('bon de commande',"bon de commande"),)
    action=serializers.ChoiceField(default=1,choices=action_choices)
    reglement_choices=(('A terme',"A terme"),('Espece',"Espece"),('Virement',"Virement"), ('chèque',"chèque"),)
    mode_reglement=serializers.ChoiceField(default=1,choices=reglement_choices)
    fournisseur = serializers.SlugRelatedField(queryset=models.Fournisseur.objects.all(),
    slug_field='id')
    # depot = DepotCustomRelationField(slug_field='id')
    # produit = ProduitCustomRelationField(
    # slug_field='id', many=True)
    caisse = CaisseCustomRelationField(
    slug_field='id')

    montanttva = serializers.ReadOnlyField(source='montantTVA')
    montantremise = serializers.ReadOnlyField(source='montantRemise')
    prixttc = serializers.ReadOnlyField(source='prixTTC')
    totalachats = serializers.ReadOnlyField(source='total')

    class Meta:
        model = models.FicheAchatCommandeFournisseur
        fields = ['id','type_fiche', 'produits','selling_point', 'fournisseur',
        'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par', 'action',
         'numero', 'date', 'montantregfour', 'mode_reglement',
         'caisse', 'observation', 'totalachats', 'TVA', 'timbre', 'remise', 'montanttva', 'montantremise', 'prixttc']
        
        read_only_fields = ['saisie_le', 'modilfié_le', 'saisie_par', 'type_fiche']
        # depth = 1

    def create(self, validated_data):
        produits_data = validated_data.pop('produits')
        request = self.context.get('request', None)
        for produit_data in produits_data:
            if not request.user.is_superuser:
                if produit_data['produit'] not in Produit.objects.filter(selling_point=request.user.vendeur.selling_point):
                    raise serializers.ValidationError({'produit': 'that product does not exist'})
        fiche = models.FicheAchatCommandeFournisseur.objects.create(**validated_data)
        for produit_data in produits_data:
            models.ProduitAchatCommandeFournisseur.objects.create(achat=fiche, **produit_data)
        return fiche
    
    # def update(self, instance, validated_data):
    #     instance.type_fiche = validated_data.get('type_fiche', instance.type_fiche)
    #     instance.selling_point = validated_data.get('selling_point', instance.selling_point)
    #     instance.fournisseur = validated_data.get('fournisseur', instance.fournisseur)
    #     instance.action = validated_data.get('action', instance.action)
    #     instance.numero = validated_data.get('numero', instance.numero)
    #     instance.date = validated_data.get('date', instance.date)
    #     instance.montantregfour = validated_data.get('montantregfour', instance.montantregfour)
    #     instance.caisse = validated_data.get('caisse', instance.caisse)
    #     instance.observation = validated_data.get('observation', instance.observation)
    #     instance.TVA = validated_data.get('TVA', instance.TVA)
    #     instance.timbre = validated_data.get('timbre', instance.timbre)
    #     instance.remise = validated_data.get('remise', instance.remise)

    #     produits_data = validated_data.pop('produits')
    #     request = self.context.get('request', None)
    #     for produit_data in produits_data:
    #         if not request.user.is_superuser:
    #             if produit_data['produit'] not in Produit.objects.filter(selling_point=request.user.vendeur.selling_point):
    #                 raise serializers.ValidationError({'produit': 'that product does not exist'})
        
    #     for produit_data in produits_data:
    #         instance.produits.produit_data = validated_data.get(produit_data['produit'], instance.produits.produit_data)
            

    #     return instance
    

    def validate(self, data):
        """
        Check that start is before finish.
        """
        for prod in data['produits']:
            
            if prod['quantite'] > prod['produit'].qtteActuelStock:
                missing = prod['quantite']-prod['produit'].qtteActuelStock
                raise serializers.ValidationError(f"you dont have enough of {prod['produit'].article}, you miss {missing} pieces")
        return data

class PayementFournisseurSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    fournisseur = serializers.SlugRelatedField(queryset=Fournisseur.objects.all(),
     slug_field='id')
    achat = AchatCustomRelationField(slug_field='id')
    reglement_data=(('A terme',"A terme"),('Espece',"Espece"),('Virement',"Virement"), ('chèque',"chèque"),)
    reglement=serializers.ChoiceField(default=1,choices=reglement_data)
    caisse = CaisseCustomRelationField(
    slug_field='id')
    # date = serializers.DateField()
    class Meta:
        model = models.PayementFournisseur
        fields = ['id','selling_point', 'date', 'fournisseur',
        'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par',
         'achat', 'montant', 'reglement', 'caisse', 'observation']

        read_only_fields = ['saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par']
        # depth = 1
    
    # def validate(self, data):
    #     mont = data['montant']
    #     if mont > data['fournisseur'].solde:
    #         raise serializers.ValidationError({'mont':'montant is bigger than solde'})
    #     return data

class ProduitRetourFournisseurSerializer(serializers.ModelSerializer):
    produit = ProduitCustomRelationField(slug_field='id')


    class Meta:
        model = models.ProduitsRetourFournisseur
        fields = ['id','quantite_retour', 'produit']

class RetoursFournisseurSerializer(WritableNestedModelSerializer):
    produits = ProduitRetourFournisseurSerializer(many=True)
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    achat = AchatCustomRelationField(slug_field='id')
    # type_fiche_choices = (('1',"Achat"),('2',"Commande"))
    # type_fiche=serializers.ChoiceField(default=1,choices=type_fiche_choices)
    reglement_choices=(('A terme',"A terme"),('Espece',"Espece"),('Virement',"Virement"), ('chèque',"chèque"),)
    reglement=serializers.ChoiceField(default=1,choices=reglement_choices)
    fournisseur = serializers.SlugRelatedField(queryset=models.Fournisseur.objects.all(),
    slug_field='id')
    # depot = DepotCustomRelationField(slug_field='id')
    # produit = ProduitCustomRelationField(
    # slug_field='id', many=True)
    caisse = CaisseCustomRelationField(
    slug_field='id')
    montant_retour = serializers.SerializerMethodField()



    class Meta:
        model = models.RetoursFournisseur
        fields = ['id','produits','selling_point', 'fournisseur', 'achat',
        'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par', 'date', 'reglement',
         'caisse', 'observation', 'montant_retour']
        
        read_only_fields = ['saisie_le', 'modilfié_le', 'saisie_par', 'montant_retour', 'modifie_par']
        # depth = 1

    def create(self, validated_data):
        produits_data = validated_data.pop('produits')
        achat_id = validated_data.pop('achat')
        request = self.context.get('request', None)
        achat = FicheAchatCommandeFournisseur.objects.get(id=achat_id.id)

        if not request.user.is_superuser:
            achat = FicheAchatCommandeFournisseur.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=achat_id.id)
        produits_achat = ProduitAchatCommandeFournisseur.objects.filter(achat=achat)
        for produit_data in produits_data:
            
            achat_prods = []
            for prod in produits_achat:
                achat_prods.append(prod.produit)
            if produit_data['produit'] not in achat_prods:
                raise serializers.ValidationError({'produit': 'Please enter a product that belongs to the sell'})
            elif produit_data['produit'] not in Produit.objects.filter(selling_point=request.user.vendeur.selling_point):
                raise serializers.ValidationError({'produit': 'that product does not exist'})
        
        fiche = models.RetoursFournisseur.objects.create(**validated_data, achat=achat)
        
        for produit_data in produits_data:
            models.ProduitsRetourFournisseur.objects.create(retour=fiche, **produit_data)
        return fiche


    def get_montant_retour(self, obj):
        prod_fiches = obj.produits.all()
        montant = 0
        for prod in prod_fiches:
            prix_retour_prod = prod.quantite_retour * prod.produit.prix_U_achat
            montant += prix_retour_prod
        return montant



#-------------------------------------CLIENT----------------------------------


class ClientSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    class Meta:
        model = Vendeur
        fields = ['id','selling_point', 'numero', 'etat_civile', 'nom',
        'type', 'telephone', 'phone_number', 'email',
         'numero_rc', 'NRC', 'NIS', 'RIB', 'solde', 'wilaya',
         'ville', 'adress', 'saisie_le', 'modilfié_le', 'saisie_par']
        read_only_fields = ['saisie_le', 'modilfié_le', 'saisie_par']
        depth = 1

class ProduitVenteClientSerializer(serializers.ModelSerializer):
    produit = ProduitCustomRelationField(slug_field='id')
    depot = DepotCustomRelationField(slug_field='id')
    prix = serializers.ReadOnlyField(source='prixProduit')
    qtteAct = serializers.ReadOnlyField(source='qtteActProduit')

    class Meta:
        model = models.ProduitVenteClient
        fields = ['id','depot', 'produit', 'quantite', 'numero_lot', 
         'prix', 'qtteAct']

class FicheVenteSerializer(WritableNestedModelSerializer):
    produits = ProduitVenteClientSerializer(many=True)
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id', required=False)
    # type_fiche_choices = (('1',"Achat"),('2',"Commande"))
    # type_fiche=serializers.ChoiceField(default=1,choices=type_fiche_choices)
    action_choices=(('Bon de livraison',"Bon de livraison"),('Facture',"Facture"),('BL sans montant',"BL sans montant"),('Facture proformat',"Facture proformat"))
    type_fiche=serializers.ChoiceField(default=1,choices=action_choices)
    type_choices=(('Détaillant',"Détaillant"),('Grossiste',"Grossiste"),('Revendeur',"Revendeur"), ('autre',"autre"),)
    type_client=serializers.ChoiceField(default=1,choices=type_choices)
    reglement_choices=(('A terme',"A terme"),('Espece',"Espece"),('Virement',"Virement"), ('chèque',"chèque"),)
    mode_reglement=serializers.ChoiceField(default=1,choices=reglement_choices)
    client = ClientCustomRelationField(queryset=models.Fournisseur.objects.all(),
    slug_field='id')
    # depot = DepotCustomRelationField(slug_field='id')
    # produit = ProduitCustomRelationField(
    # slug_field='id', many=True)
    caisse = CaisseCustomRelationField(
    slug_field='id')

    montanttva = serializers.ReadOnlyField(source='montantTVA')
    montantremise = serializers.ReadOnlyField(source='montantRemise')
    prixttc = serializers.ReadOnlyField(source='prixTTC')
    totalachats = serializers.ReadOnlyField(source='total')
    reste_a_payer = serializers.SerializerMethodField()
    class Meta:
        model = models.FicheVenteClient
        fields = ['id','type_fiche', 'produits','selling_point', 'client', 'type_client',
        'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par', 'reste_a_payer',
         'numero', 'date', 'montant_reg_client', 'mode_reglement',
         'caisse', 'observation', 'totalachats', 'TVA', 'timbre',
          'remise', 'montanttva', 'montantremise', 'prixttc', 'reste_a_payer']
        
        read_only_fields = ['saisie_le', 'modilfié_le', 'saisie_par', 'type_fiche', 'reste_a_payer']
        # depth = 1

    def create(self, validated_data):
        produits_data = validated_data.pop('produits')
        request = self.context.get('request', None)
        for produit_data in produits_data:
            if not request.user.is_superuser:
                if produit_data['produit'] not in Produit.objects.filter(selling_point=request.user.vendeur.selling_point):
                    raise serializers.ValidationError({'produit': 'that product does not exist'})
        fiche = models.FicheVenteClient.objects.create(**validated_data)
        for produit_data in produits_data:
            models.ProduitVenteClient.objects.create(vente=fiche, **produit_data)
        return fiche
    def validate(self, data):
        """
        Check that start is before finish.
        """
        for prod in data['produits']:
            if prod['quantite'] > prod['produit'].qtteActuelStock:
                missing = prod['produit'].qtteActuelStock - prod['quantite']
                raise serializers.ValidationError(f"you dont have enough of {prod['produit'].article}, you miss {missing} pieces")
        return data

    def get_reste_a_payer(self, obj):
        reste = obj.total - obj.montant_reg_client
        return reste


class PayementClientSerializer(serializers.ModelSerializer):
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    client = ClientCustomRelationField(
     slug_field='id')
    achat = AchatCustomRelationField(slug_field='id')
    reglement_data=(('A terme',"A terme"),('Espece',"Espece"),('Virement',"Virement"), ('chèque',"chèque"),)
    reglement=serializers.ChoiceField(default=1,choices=reglement_data)
    caisse = CaisseCustomRelationField(
    slug_field='id')
    # client_solde = serializers.SerializerMethodField()
    class Meta:
        model = PayementClient
        fields = ['id','selling_point', 'date', 'client',
        'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par',
         'achat', 'montant', 'reglement', 'caisse', 'observation']
        read_only_fields = ['saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par']
        depth = 1
    def validate(self, data):
        """
        Check that start is before finish.
        """
        
        if data['client'].solde == 0:
                raise serializers.ValidationError(f"the client {data['client']} has no debt ")
        if data['montant'] > data['client'].solde:
            raise serializers.ValidationError(f"the client {data['client']} is overpaying")
        return data
    # def get_client_solde(self, data):
    #     solde = data['client'].solde
    #     return solde
    

class ProduitRetourClientSerializer(serializers.ModelSerializer):
    produit = ProduitCustomRelationField(slug_field='id')


    class Meta:
        model = models.ProduitsRetourClient
        fields = ['id','quantite_retour', 'produit']


class RetoursClientSerializer(WritableNestedModelSerializer):
    produits = ProduitRetourClientSerializer(many=True)
    selling_point = SellingPointCustomRelationQueryset(
    slug_field='id')
    vente = VenteCustomRelationField(slug_field='id')
    # type_fiche_choices = (('1',"Achat"),('2',"Commande"))
    # type_fiche=serializers.ChoiceField(default=1,choices=type_fiche_choices)
    reglement_choices=(('A terme',"A terme"),('Espece',"Espece"),('Virement',"Virement"), ('chèque',"chèque"),)
    reglement=serializers.ChoiceField(default=1,choices=reglement_choices)
    client = ClientCustomRelationField(
    slug_field='id')
    # depot = DepotCustomRelationField(slug_field='id')
    # produit = ProduitCustomRelationField(
    # slug_field='id', many=True)
    caisse = CaisseCustomRelationField(
    slug_field='id')
    montant_retour = serializers.SerializerMethodField()



    class Meta:
        model = models.RetoursClient
        fields = ['id','produits','selling_point', 'client', 'vente',
        'saisie_le', 'modilfié_le', 'saisie_par', 'modifie_par', 'date', 'reglement',
         'caisse', 'observation', 'montant_retour']
        
        read_only_fields = ['saisie_le', 'modilfié_le', 'saisie_par', 'montant_retour', 'modifie_par']
        # depth = 1

    def create(self, validated_data):
        produits_data = validated_data.pop('produits')
        vente_id = validated_data.pop('vente')
        request = self.context.get('request', None)
        vente = FicheVenteClient.objects.get(id=vente_id.id)
       
        if not request.user.is_superuser:
            vente = FicheVenteClient.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=vente_id.id)
        produits_vente = models.ProduitVenteClient.objects.filter(vente=vente)
        for produit_data in produits_data:
            
            achat_prods = []
            for prod in produits_vente:
                achat_prods.append(prod.produit)
            if produit_data['produit'] not in achat_prods:
                raise serializers.ValidationError({'produit': 'Please enter a product that belongs to the sell'})
            if not request.user.is_superuser:
                if produit_data['produit'] not in Produit.objects.filter(selling_point=request.user.vendeur.selling_point):
                    raise serializers.ValidationError({'produit': 'that product does not exist'})
        
        fiche = models.RetoursClient.objects.create(**validated_data, vente=vente)
        
        for produit_data in produits_data:
            models.ProduitsRetourClient.objects.create(retour=fiche, **produit_data)
        return fiche


    def get_montant_retour(self, obj):
        prod_fiches = obj.produits.all()
        montant = 0
        for prod in prod_fiches:
            prix_retour_prod = prod.quantite_retour * prod.produit.prix_detail
            montant += prix_retour_prod
        return montant

    def validate(self, data):
        vente = data['vente']
        prods = models.ProduitVenteClient.objects.filter(vente=vente)
        for prod in data['produits']:
            produit = prod['produit']
            try:
                venteprod = prods.get(produit=produit)
            except models.ProduitVenteClient.DoesNotExist:
                raise serializers.ValidationError({'product': 'either this product does not exist, or it s not a part of the given sell'})
            if prod['quantite_retour'] > venteprod.quantite:
                raise serializers.ValidationError({'produit': 'client is retutning more than he bought'})
            if prod['quantite_retour'] <= 0:
                raise serializers.ValidationError({'produit': 'you cant return 0 quantity'})
        return data