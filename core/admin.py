from django.contrib import admin
from .models import (SellingPoint, Caisse, Produit, Depot, FicheCredit,
 FicheDebit, Vendeur, Fournisseur, FicheAchatCommandeFournisseur,
 PayementFournisseur,  RetoursFournisseur, FraisGenerales, 
 Client, FicheVenteClient, PayementClient, RetoursClient, )

admin.site.register(SellingPoint)
admin.site.register(Caisse)
admin.site.register(Produit)
admin.site.register(Depot)
admin.site.register(Vendeur)
admin.site.register(Fournisseur)
admin.site.register(FicheAchatCommandeFournisseur)
admin.site.register(PayementFournisseur)
admin.site.register(RetoursFournisseur)
admin.site.register(Client)
admin.site.register(FicheVenteClient)
admin.site.register(PayementClient)
admin.site.register(FraisGenerales)
admin.site.register(RetoursClient)
admin.site.register(FicheDebit)
admin.site.register(FicheCredit)





# Register your models here.
