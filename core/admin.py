from django.contrib import admin
from .models import (SellingPoint, Caisse, Produit, Depot, FicheCredit,
 FicheDebit, Vendeur, Fournisseur, FicheAchatCommandeFournisseur,
 PayementFournisseur,  RetoursFournisseur, FraisGenerales, 
 Client, FicheVenteClient, PayementClient, RetoursClient, ProduitAchatCommandeFournisseur, ProduitsRetourFournisseur)

admin.site.register(SellingPoint)
admin.site.register(Caisse)
admin.site.register(Produit)
admin.site.register(Depot)
admin.site.register(Vendeur)
admin.site.register(Fournisseur)
class PACFInline(admin.StackedInline):
    model = ProduitAchatCommandeFournisseur

class FicheAchatCommandeFournisseurAdmin(admin.ModelAdmin):
     inlines = [PACFInline,]

admin.site.register(FicheAchatCommandeFournisseur, FicheAchatCommandeFournisseurAdmin)
class PRFInline(admin.StackedInline):
    model = ProduitsRetourFournisseur

class RetourAdmin(admin.ModelAdmin):
     inlines = [PRFInline,]

admin.site.register(RetoursFournisseur, RetourAdmin)

admin.site.register(PayementFournisseur)
admin.site.register(Client)
admin.site.register(FicheVenteClient)
admin.site.register(PayementClient)
admin.site.register(FraisGenerales)
admin.site.register(RetoursClient)
admin.site.register(FicheDebit)
admin.site.register(FicheCredit)





# Register your models here.
