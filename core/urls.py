from os import name
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('sp_get_post', views.sellingPointGETPOST, name='sp_get_post'),
    path('sp_pk/<int:pk>', views.sellingPointPk, name='sp_pk'),
    path('caisse_get_post', views.caisseGETPOST, name='caisse_get_post'),
    path('caisse_pk/<int:pk>', views.caissePk, name='caisse_pk'),
    path('produit_get_post', views.produitGETPOST, name='produit_get_post'),
    path('produit_pk/<int:pk>', views.produitPk, name='produit_pk'),
    path('depot_get_post', views.DepotGETPOST.as_view(), name='depot_get_post'),
    path('depot_pk/<int:pk>', views.DepotPk.as_view(), name='depot_pk'),
    path('fiche_credit_get_post', views.ficheCreditGETPOST, name='fiche_credit_get_post'),
    path('fiche_credit_pk/<int:pk>', views.ficheCreditPk, name='fiche_credit_pk'),
    path('fiche_debit_get_post', views.ficheDebitGETPOST, name='fiche_debit_get_post'),
    path('fiche_debit_pk/<int:pk>', views.ficheDebitPk, name='fiche_debit_pk'),
    path('vendeur_get_post', views.vendeurGETPOST, name='vendeur_post'),
    path('vendeur_pk/<int:pk>', views.vendeurPk, name='vendeur_pk'),
    path('fournisseur_get_post', views.fournisseurGETPOST, name='fournisseur_get_post'),
    path('fournisseur_pk/<int:pk>', views.fournisseurPk, name='fournisseur_pk'),
    path('ficheachatfournisseur_get_post', views.ficheAchatFournisseurGETPOST, name='ficheAchatfournisseur_get_post'),
    path('ficheachatfournisseur_pk/<int:pk>', views.ficheAchatFournisseurPk, name='ficheAchatfournisseur_pk'),
    path('fichecommandefournisseur_get_post', views.ficheCommandeFournisseurGETPOST, name='fichecommandefournisseur_get_post'),
    path('fichecommanfournisseur_pk/<int:pk>', views.ficheCommandeFournisseurPk, name='fichecommanfournisseur_pk'),
    path('payementfournisseur_get_post', views.payementFournisseurGETPOST, name='payementfournisseur_get_post'),
    path('payementfournisseur_pk/<int:pk>', views.payementFournisseurPk, name='payementfournisseur_pk'),
    path('fraisgenerales_get_post', views.fraisGeneralesGETPOST, name='fraisgenerales_get_post'),
    path('raisgenerales_pk/<int:pk>', views.fraisGeneralesPk, name='raisgenerales_pk'),
    path('retourfournisseur_get_post', views.retourFournisseurGETPOST, name='retourfournisseur_get_post'),

]