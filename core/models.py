from ast import Delete
from pyexpat import model
from tkinter import CASCADE
from django.conf import Settings
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.forms import DateField


class SellingPoint(models.Model):
    name = models.CharField(max_length=100)
    societé = models.CharField( max_length=100)
    adress = models.CharField(max_length=200)
    wilaya = models.CharField( max_length=100)
    ville = models.CharField( max_length=100)
    telephone = models.IntegerField()
    fax = models.IntegerField()
    email = models.EmailField()
    articles_dimposition = models.TextField()

    def __str__(self) -> str:
        return f'{self.name} selling point'


class Caisse(models.Model):
    selling_point = models.ForeignKey(SellingPoint, on_delete=models.CASCADE, related_name='selling_point_caisse')
    caisse_data=(('1',"principale"),('2',"secondaire"))
    caisse=models.CharField(default=1,choices=caisse_data,max_length=10)
    nom = models.CharField(max_length=50)
    wilaya = models.CharField(max_length=50)
    ville = models.CharField(max_length=50)
    solde = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    def __str__(self) -> str:
        return f'{self.nom} caisse'

class Produit(models.Model):
    reference = models.CharField(max_length=200)
    article = models.TextField(max_length=200)
    img = models.ImageField( null=True, blank=True, upload_to="images/produits/")
    unit_data = (('1',"m²"),('2',"m"),('3',"L"), ('4',"Kg"), ('4',"g"))
    unit=models.CharField(default=1,choices=unit_data,max_length=10)
    famille_data = (('1',"1"),('2',"2"),('3',"3"), ('4',"4"), ('4',"5"))
    famille = models.CharField(default=1,choices=famille_data,max_length=10,)
    marque_data = (('1',"1"),('2',"2"),('3',"3"), ('4',"4"), ('5',"5"))
    marque = models.CharField(default=1,choices=marque_data,max_length=10, blank=True, null=True)
    prix_U_achat = models.DecimalField(max_digits=5, decimal_places=2)
    prix_detail = models.DecimalField(max_digits=5, decimal_places=2)
    prix_vente_gros = models.DecimalField(max_digits=5, decimal_places=2)
    prix_vente_revendeur = models.DecimalField(max_digits=5, decimal_places=2)
    prix_vente_autre = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    stock_alerte = models.PositiveIntegerField(blank=True, null=True)
    stock_actuel = models.PositiveIntegerField(blank=True, null=True)
    qtte = models.PositiveIntegerField(blank=True, null=True)
    ancien_prix = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    def __str__(self) -> str:
        return f'{self.article}'

    def margePprixDetail(self):
        marge = self.prix_detail - self.prix_U_achat
        pourcentage_marge = (marge * 100)/self.prix_U_achat
        return pourcentage_marge

    def margeVenteGrossiste(self):
        marge = self.prix_vente_gros - self.prix_U_achat
        pourcentage_marge = (marge * 100)/self.prix_U_achat
        return pourcentage_marge
    
    def margeVenteRevendeur(self):
        marge = self.prix_vente_revendeur - self.prix_U_achat
        pourcentage_marge = (marge * 100)/self.prix_U_achat
        return pourcentage_marge

    def margeVenteGrossiste(self):
        marge = self.prix_vente_autre - self.prix_U_achat
        pourcentage_marge = (marge * 100)/self.prix_U_achat
        return pourcentage_marge

class Depot(models.Model):
    selling_point = models.ForeignKey(SellingPoint, on_delete=models.PROTECT)
    nom = models.CharField(max_length=100)
    adresse = models.TextField(max_length=500)
    produits = models.ManyToManyField(Produit, related_name="produits", blank=True)
    def __str__(self) -> str:
        return f'{self.nom} dépot'

class FicheCredit(models.Model):
    date = models.DateField(auto_now=True)
    montant = models.DecimalField(max_digits=5, decimal_places=2)
    TVA = models.DecimalField(default=0,
        validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
        ], max_digits=5, decimal_places=2)
    reglement_data=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    reglement=models.CharField(default=1,choices=reglement_data,max_length=10)
    caisse = models.ForeignKey(Caisse, on_delete=models.CASCADE)
    observ = models.TextField(max_length=500)

    def montantTVA(self):
        montant = [(self.TVA)*(self.montant)]/100
        return montant
    def prixTTC(self):
        montant = self.montant - self.montantTVA
        return montant
    def __str__(self) -> str:
        return f'fiche crédit de la caisse {self.caisse.nom}'

class FicheDebit(models.Model):
    date = models.DateField(auto_now=True)
    montant = models.DecimalField(max_digits=5, decimal_places=2)
    TVA = models.DecimalField(default=0,
        validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
        ], max_digits=5, decimal_places=2)
    reglement_data=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    reglement=models.CharField(default=1,choices=reglement_data,max_length=10)
    caisse = models.ForeignKey(Caisse, on_delete=models.CASCADE)
    observ = models.TextField(max_length=500)

    def montantTVA(self):
        montant = [(self.TVA)*(self.montant)]/100
        return montant
    def prixTTC(self):
        montant = self.montant - self.montantTVA
        return montant
    def __str__(self) -> str:
        return f'fiche débit de la caisse {self.caisse.nom}'
  

class Vendeur(models.Model):
    selling_point = models.ForeignKey(SellingPoint, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    adress = models.CharField(max_length=100)
    identity_num = models.BigIntegerField()
    admin = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number_1 = models.IntegerField()
    phone_number_2= models.IntegerField(blank=True, null=True)
    family_situation = models.CharField(max_length=100)
    def __str__(self) -> str:
        return f'{self.name} {self.last_name}'

class Fournisseur(models.Model):
    etat_civile_data=(('1',"M."),('2',"Mme"),('3',"SARL"), ('4',"EURL"), ('5',"ETS"), ('5',"autre"),)
    etat_civile=models.CharField(default=1,choices=etat_civile_data,max_length=10)
    name = models.CharField(max_length=50)
    telephone = models.IntegerField()
    phone_number = models.IntegerField()
    fax = models.IntegerField(blank=True, null=True)
    email = models.EmailField()
    NRC = models.CharField(max_length=50, blank=True, null=True)
    NIS = models.CharField(max_length=50, blank=True, null=True)
    RIB = models.CharField(max_length=50, blank=True, null=True)
    solde = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    wilaya = models.CharField(max_length=50)
    ville = models.CharField(max_length=50)
    adress = models.CharField(max_length=100)
    selling_ponit = models.ManyToManyField(SellingPoint, related_name= 'selling_point')
    def __str__(self) -> str:
        return f'{self.etat_civile} {self.name}'

class FicheAchatCommandeFournisseur(models.Model):
    type_fiche_data = (('1',"Achat"),('2',"Commande"))
    type_fiche=models.CharField(default=1,choices=type_fiche_data,max_length=10)
    selling_point = models.ForeignKey(SellingPoint, on_delete=models.PROTECT)
    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.PROTECT)
    depot = models.ForeignKey(Depot, on_delete=models.PROTECT)
    saisie_le = models.DateField(auto_now_add=True)
    modilfié_le = models.DateField(auto_now=True)
    saisie_par = models.ForeignKey(User, on_delete=models.CASCADE)
    action_data=(('1',"facture"),('2',"bon"),('3',"bon de commande"),)
    action=models.CharField(default=1,choices=action_data,max_length=10)
    numero = models.IntegerField()
    code = models.IntegerField()
    produit = models.ManyToManyField(Produit, related_name="produit_achat_fournisseur")
    quantite = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateField(auto_now=True)
    article = models.CharField(default=1,choices=action_data,max_length=10)
    numero_lot = models.IntegerField()
    date_de_fabrication = models.DateField()
    date_dexpiration = models.DateField()
    prix = models.DecimalField(max_digits=5, decimal_places=2)
    unit = models.CharField(max_length=10)
    qtt_stock_actuel = models.DecimalField(max_digits=5, decimal_places=2)
    

    # Reglement fournisseur
    montantregfour = models.DecimalField(max_digits=5, decimal_places=2)
    reglement_data=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    mode_reglement=models.CharField(default=1,choices=reglement_data,max_length=10)
    caisse = models.ForeignKey(Caisse, on_delete=models.CASCADE)
    observation = models.TextField(max_length=500)

    #montant de fournisseur
    prixHT = models.DecimalField(max_digits=5, decimal_places=2)
    TVA = models.DecimalField(default=0,
        validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
        ], max_digits=5, decimal_places=2)
    timbre = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    remise = models.DecimalField(default=0,
        validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
        ], max_digits=5, decimal_places=2)
    
    def montantTVA(self):
        montant = [(self.TVA)*(self.prixHT)]/100
        return montant
    
    def montantRemise(self):
        montant = [(self.remise)*(self.prixHT)]/100
        return montant
    
    def prixTTC(self):
        montant = self.prixHT - self.montantTVA - self.montantRemise - self.timbre
        return montant
    
    def __str__(self) -> str:
        return f'{self.type_fiche} {self.fournisseur.name}'
    
class PayementFournisseur(models.Model):
    date = models.DateField()
    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.PROTECT)
    saisie_le = models.DateField(auto_now_add=True)
    modilfié_le = models.DateField(auto_now=True)
    saisie_par = models.ForeignKey(User, on_delete=models.CASCADE)
    achat = models.ForeignKey(FicheAchatCommandeFournisseur, on_delete=models.CASCADE)
    solde = models.DecimalField(max_digits=5, decimal_places=2)
    montant = models.DecimalField(max_digits=5, decimal_places=2)
    reglement_data=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    reglement=models.CharField(default=1,choices=reglement_data,max_length=10)
    caisse = models.ForeignKey(Caisse, on_delete=models.CASCADE)
    observation = models.TextField(max_length=500)
    def __str__(self) -> str:
        return f'fiche payement {self.fournisseur.name}'

class RetoursFournisseur(models.Model):
    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.CASCADE)
    date = models.DateField()
    achat = models.ForeignKey(FicheAchatCommandeFournisseur, on_delete=models.CASCADE)
    produit = models.ManyToManyField(Produit, related_name="produit_fournisseur")
    qtte_achetée = models.DecimalField(max_digits=5, decimal_places=2)
    qtte_retour = models.DecimalField(max_digits=5, decimal_places=2)
    depot = models.ForeignKey(Depot, on_delete=models.CASCADE)
    montant = models.DecimalField(max_digits=5, decimal_places=2)
    reglement_data=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    reglement=models.CharField(default=1,choices=reglement_data,max_length=10)
    caisse = models.ForeignKey(Caisse, on_delete=models.CASCADE)
    observation = models.TextField(max_length=500)
    saisie_le = models.DateField(auto_now_add=True)
    modilfié_le = models.DateField(auto_now=True)
    saisie_par = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'fiche retour {self.fournisseur.name}'

class FraisGenerales(models.Model):
    number = models.IntegerField()
    date = models.DateField()
    type_data=()
    type=models.CharField(default=1,choices=type_data,max_length=10)
    montant = models.DecimalField(max_digits=5, decimal_places=2)
    TVA = models.DecimalField(default=0,
        validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
        ], max_digits=5, decimal_places=2)
    
    timbre = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    reglement_data=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    reglement=models.CharField(default=1,choices=reglement_data,max_length=10)
    saisie_le = models.DateField(auto_now_add=True)
    modilfié_le = models.DateField(auto_now=True)
    saisie_par = models.ForeignKey(User, on_delete=models.CASCADE)
    caisse = models.ForeignKey(Caisse, on_delete=models.CASCADE)
    observation = models.TextField(max_length=500)

    def montantTVA(self):
        montant = (self.TVA*self.montant)/100
        return montant
    
    def montant(self):
        montant = self.montant - self.montantTVA - self.timbre
        return montant
    
    def __str__(self) -> str:
        return f'frais {self.number} de la caisse {self.caisse.nom}'

#----------------------------------- CLIENTS ----------------------------------------
    
class Client(models.Model):
    selling_point = models.ForeignKey(SellingPoint, on_delete=models.CASCADE)
    numero = models.PositiveIntegerField()
    etat_civile_data=(('1',"M."),('2',"Mme"),('3',"SARL"), ('4',"EURL"), ('5',"ETS"), ('5',"autre"),)
    etat_civile=models.CharField(default=1,choices=etat_civile_data,max_length=10)
    nom = models.CharField(max_length=100)
    type_data=(('1',"Détaillant"),('2',"Grossiste"),('3',"Revendeur"), ('5',"autre"),)
    type=models.CharField(default=1,choices=type_data,max_length=10)
    telephone = models.IntegerField(blank=True, null=True)
    phone_number = models.IntegerField()
    email = models.EmailField(blank=True, null=True)
    numero_rc= models.PositiveIntegerField(blank=True, null=True)
    NRC = models.CharField(max_length=50, blank=True, null=True)
    NIS = models.CharField(max_length=50, blank=True, null=True)
    RIB = models.CharField(max_length=50, blank=True, null=True)
    solde = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    wilaya = models.CharField(max_length=50)
    ville = models.CharField(max_length=50)
    adress = models.CharField(max_length=100)
    saisie_le = models.DateField(auto_now_add=True)
    modilfié_le = models.DateField(auto_now=True)
    saisie_par = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.etat_civile} {self.nom}'

class FicheVenteClient(models.Model):
    type_fiche_data = (('1',"Bon de livraison"),('2',"Facture"),('2',"BL sans montant"),('2',"Facture proformat"))
    type_fiche=models.CharField(default=1,choices=type_fiche_data,max_length=10)
    selling_point = models.ForeignKey(SellingPoint, on_delete=models.PROTECT)
    numero = models.IntegerField()
    client = models.ForeignKey(Client, on_delete=models.PROTECT)
    solde = models.DecimalField(max_digits=5, decimal_places=2)
    depot = models.ForeignKey(Depot, on_delete=models.PROTECT)
    quantite = models.DecimalField(max_digits=5, decimal_places=2)
    saisie_le = models.DateField(auto_now_add=True)
    modilfié_le = models.DateField(auto_now=True)
    saisie_par = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.IntegerField()
    produit = models.ManyToManyField(Produit, related_name="produit_vente_client")
    date = models.DateField(auto_now=True)
    prix = models.DecimalField(max_digits=5, decimal_places=2)
    reste_a_payer = models.DecimalField(max_digits=5, decimal_places=2)

    # Reglement client
    montant_reg_client = models.DecimalField(max_digits=5, decimal_places=2)
    reglement_data=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    mode_reglement=models.CharField(default=1,choices=reglement_data,max_length=10)
    caisse = models.ForeignKey(Caisse, on_delete=models.CASCADE)
    observation = models.TextField(max_length=500)

    #montant de fournisseur
    prixHT = models.DecimalField(max_digits=5, decimal_places=2)
    TVA = models.DecimalField(default=0,
        validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
        ], max_digits=5, decimal_places=2)
    timbre = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    remise = models.DecimalField(default=0,
        validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
        ], max_digits=5, decimal_places=2)
    
    def montantTVA(self):
        montant = [(self.TVA)*(self.prixHT)]/100
        return montant
    
    def montantRemise(self):
        montant = [(self.remise)*(self.prixHT)]/100
        return montant
    
    def prixTTC(self):
        montant = self.prixHT - self.montantTVA - self.montantRemise - self.timbre
        return montant
    
    def __str__(self) -> str:
        return f'{self.type_fiche} {self.client.nom}'

class PayementClient(models.Model):
    date = models.DateField()
    client = models.ForeignKey(Client, on_delete=models.PROTECT)
    saisie_le = models.DateField(auto_now_add=True)
    modilfié_le = models.DateField(auto_now=True)
    saisie_par = models.ForeignKey(User, on_delete=models.CASCADE)
    achat = models.ForeignKey(FicheAchatCommandeFournisseur, on_delete=models.CASCADE)
    solde = models.DecimalField(max_digits=5, decimal_places=2)
    montant = models.DecimalField(max_digits=5, decimal_places=2)
    reglement_data=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    reglement=models.CharField(default=1,choices=reglement_data,max_length=10)
    caisse = models.ForeignKey(Caisse, on_delete=models.CASCADE)
    observation = models.TextField(max_length=500)

    def __str__(self) -> str:
        return f'payement {self.client.nom}'

class RetoursClient(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    date = models.DateField()
    achat = models.ForeignKey(FicheAchatCommandeFournisseur, on_delete=models.CASCADE)
    produit = models.ManyToManyField(Produit, related_name="produit_client")
    qtte_achetée = models.DecimalField(max_digits=5, decimal_places=2)
    qtte_retour = models.DecimalField(max_digits=5, decimal_places=2)
    depot = models.ForeignKey(Depot, on_delete=models.CASCADE)
    montant = models.DecimalField(max_digits=5, decimal_places=2)
    reglement_data=(('1',"A terme"),('2',"Espece"),('3',"Virement"), ('4',"chèque"),)
    reglement=models.CharField(default=1,choices=reglement_data,max_length=10)
    caisse = models.ForeignKey(Caisse, on_delete=models.CASCADE)
    observation = models.TextField(max_length=500)
    saisie_le = models.DateField(auto_now_add=True)
    modilfié_le = models.DateField(auto_now=True)
    saisie_par = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'retour {self.client.nom}'

    

    

    








    
    

    



