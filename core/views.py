from django.shortcuts import render
from django.http.response import JsonResponse
from .models import (Depot, FicheDebit, Fournisseur, SellingPoint, Caisse, Produit, FicheCredit, Vendeur)
from . import models
from rest_framework.decorators import api_view
from .serializers import (FournisseurSerializer, SellingPointSerializer, CaisseSerializer,
ProduitSerializer, DepotSerializer, FicheCreditSerializer, FicheDebitSerializer, VendeurSerializer)
from . import serializers
from rest_framework import generics, mixins, viewsets
from rest_framework import status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from django.db.models import F
# Create your views here.

@api_view(['GET','POST'])
def sellingPointGETPOST(request):
    if request.method == 'GET':
        selling_points = SellingPoint.objects.all()
        if not request.user.is_superuser:
            selling_points = SellingPoint.objects.filter(vendeur=request.user.vendeur)
        
        serializer = SellingPointSerializer(selling_points, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = SellingPointSerializer(data= request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def sellingPointPk(request, pk):
    try:
        selling_point = SellingPoint.objects.get(id=pk)
        if not request.user.is_superuser:
            selling_point = SellingPoint.objects.filter(vendeur=request.user.vendeur).get(id=pk)
        
    except SellingPoint.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = SellingPointSerializer(selling_point)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SellingPointSerializer(selling_point, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        selling_point.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)
    
@api_view(['GET','POST'])
def caisseGETPOST(request):
    if request.method == 'GET':
        caisses = Caisse.objects.all()
        if not request.user.is_superuser:
            caisses = Caisse.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = CaisseSerializer(caisses, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = CaisseSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def caissePk(request, pk):
    
    try:
        caisse = Caisse.objects.get(id=pk)
        if not request.user.is_superuser:
            caisse = Caisse.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
        # serializer = CaisseSerializer(caisse)
    except Caisse.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CaisseSerializer(caisse)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CaisseSerializer(caisse, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        caisse.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def produitGETPOST(request):
    if request.method == 'GET':
        produit = Produit.objects.all()
        if not request.user.is_superuser:
            produit = Produit.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = ProduitSerializer(produit, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = ProduitSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT', 'DELETE'])
def produitPk(request, pk):
    try:
        produit = Produit.objects.get(id=pk)
        if not request.user.is_superuser:
            produit = Produit.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except Produit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ProduitSerializer(produit)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProduitSerializer(produit, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        produit.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def avariesGETPOST(request):
    if request.method == 'GET':
        ava = models.Avaries.objects.all()
        if not request.user.is_superuser:
            ava = models.Avaries.objects.filter(vendeur=request.user.vendeur)
        
        serializer = serializers.AvariesSerializer(ava, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.AvariesSerializer(data= request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            serializer.instance.produit.qtte_avarie += serializer.instance.qtte
            serializer.instance.produit
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def avariesPk(request, pk):
    try:
        ava = models.Avaries.objects.get(id=pk)
        if not request.user.is_superuser:
            ava = models.Avaries.objects.filter(vendeur=request.user.vendeur).get(id=pk)
        
    except models.Avaries.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.AvariesSerializer(ava)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = serializers.AvariesSerializer(ava, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        ava.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

class DepotGETPOST(generics.ListCreateAPIView):
    queryset = Depot.objects.all()
    serializer_class = DepotSerializer

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = DepotSerializer(queryset, many=True)
        return Response(serializer.data)

class DepotPk(generics.RetrieveUpdateDestroyAPIView):
    queryset = Depot.objects.all()
    serializer_class = DepotSerializer

@api_view(['GET','POST'])
def ficheCreditGETPOST(request):
    if request.method == 'GET':
        fiche = FicheCredit.objects.all()
        if not request.user.is_superuser:
            fiche = FicheCredit.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = FicheCreditSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = FicheCreditSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # serializer.instance.
            serializer.save(saisie_par = request.user)
            fiche = serializer.instance
            caisse = fiche.caisse
            caisse.montant_credit += fiche.prixTTC
            caisse.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def ficheCreditPk(request, pk):
    try:
        fiche = FicheCredit.objects.get(id=pk)
        if not request.user.is_superuser:
            fiche = FicheCredit.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except FicheCredit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = FicheCreditSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = FicheCreditSerializer(fiche, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save(modifie_par = request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fiche.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def ficheDebitGETPOST(request):
    if request.method == 'GET':
        fiche = FicheDebit.objects.all()
        if not request.user.is_superuser:
            fiche = FicheDebit.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = FicheDebitSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = FicheDebitSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # serializer.instance.
            serializer.save(saisie_par = request.user)
            serializer.save(saisie_par = request.user)
            fiche = serializer.instance
            caisse = fiche.caisse
            caisse.montant_debit += fiche.prixTTC
            caisse.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def ficheDebitPk(request, pk):
    try:
        fiche = FicheDebit.objects.get(id=pk)
        if not request.user.is_superuser:
            fiche = FicheDebit.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except FicheDebit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = FicheDebitSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = FicheDebitSerializer(fiche, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save(modifie_par = request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fiche.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def vendeurGETPOST(request):
    if request.method == 'GET':
        vendeur = models.Vendeur.objects.all()
        if not request.user.is_superuser:
            vendeur = models.Vendeur.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = serializers.VendeurSerializer(vendeur, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.VendeurSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def vendeurPk(request, pk):
    try:
        vendeur = models.Vendeur.objects.get(id=pk)
        if not request.user.is_superuser:
            vendeur = models.Vendeur.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except Vendeur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.VendeurSerializer(vendeur)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = VendeurSerializer(vendeur, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        vendeur.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def fraisGeneralesGETPOST(request):
    if request.method == 'GET':
        frais = models.FraisGenerales.objects.all()
        if not request.user.is_superuser:
            frais = models.FraisGenerales.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = serializers.FraisGeneralesSerializer(frais, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.FraisGeneralesSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(saisie_par=request.user)
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def fraisGeneralesPk(request, pk):
    try:
        frais = models.FraisGenerales.objects.get(id=pk)
        if not request.user.is_superuser:
            frais = models.FraisGenerales.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except Vendeur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.VendeurSerializer(frais)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = VendeurSerializer(frais, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save(modifie_par=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        frais.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)


@api_view(['GET','POST'])
def fournisseurGETPOST(request):
    if request.method == 'GET':
        four = models.Fournisseur.objects.all()
        if not request.user.is_superuser:
            four = models.Fournisseur.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = serializers.FournisseurSerializer(four, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.FournisseurSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def fournisseurPk(request, pk):
    try:
        four = models.Fournisseur.objects.get(id=pk)
        if not request.user.is_superuser:
            four = models.Fournisseur.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except Fournisseur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.FournisseurSerializer(four)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = FournisseurSerializer(four, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        four.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)
    
@api_view(['GET','POST'])
def ficheAchatFournisseurGETPOST(request):
    if request.method == 'GET':
        fiche = models.FicheAchatCommandeFournisseur.objects.filter(type_fiche='1')
        if not request.user.is_superuser:
            fiche = models.FicheAchatCommandeFournisseur.objects.filter(type_fiche='1').filter(selling_point=request.user.vendeur.selling_point)
        serializer = serializers.FicheACFournisseurSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.FicheACFournisseurSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # serializer.instance.saisie_par = request.user
            serializer.save(saisie_par = request.user, type_fiche='1')
            for prod in serializer.instance.produits.all():
                                
                
                prod.produit.qtte_achete += prod.quantite
                prod.produit.save()
            caisse = serializer.instance.caisse
            caisse.montant_achats_four -= serializer.instance.montantregfour
            caisse.save()
            serializer.instance.fournisseur.solde += (serializer.instance.total-serializer.instance.montantregfour)
            serializer.instance.fournisseur.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def ficheAchatFournisseurPk(request, pk):
    try:
        fiche = models.FicheAchatCommandeFournisseur.objects.filter(type_fiche='1').get(id=pk)
        if not request.user.is_superuser:
            four = models.FicheAchatCommandeFournisseur.objects.filter(type_fiche='1').filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except models.FicheAchatCommandeFournisseur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.FicheACFournisseurSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = serializers.FicheACFournisseurSerializer(fiche,
         data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save(type_fiche='1', modifie_par=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fiche.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def ficheCommandeFournisseurGETPOST(request):
    if request.method == 'GET':
        fiche = models.FicheAchatCommandeFournisseur.objects.filter(type_fiche='2')
        if not request.user.is_superuser:
            fiche = models.FicheAchatCommandeFournisseur.objects.filter(type_fiche='2').filter(selling_point=request.user.vendeur.selling_point)
        serializer = serializers.FicheACFournisseurSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.FicheACFournisseurSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # serializer.instance.saisie_par = request.user
            serializer.save(saisie_par = request.user, type_fiche='2')
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def ficheCommandeFournisseurPk(request, pk):
    try:
        fiche = models.FicheAchatCommandeFournisseur.objects.filter(type_fiche='2').get(id=pk)
        if not request.user.is_superuser:
            four = models.FicheAchatCommandeFournisseur.objects.filter(type_fiche='2').filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except models.FicheAchatCommandeFournisseur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.FicheACFournisseurSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = serializers.FicheACFournisseurSerializer(fiche,
         data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save(type_fiche='2', modifie_par=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fiche.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)


@api_view(['GET','POST'])
def payementFournisseurGETPOST(request):
    if request.method == 'GET':
        fiche = models.PayementFournisseur.objects.all()
        if not request.user.is_superuser:
            fiche = models.PayementFournisseur.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = serializers.PayementFournisseurSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.PayementFournisseurSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # serializer.instance.saisie_par = request.user
            serializer.save(saisie_par = request.user)
            pay = serializer.instance
            pay.caisse.montant_pay_four += pay.montant
            pay.caisse.save()
            pay.fournisseur.solde -= pay.montant
            pay.fournisseur.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def payementFournisseurPk(request, pk):
    try:
        fiche = models.PayementFournisseur.objects.get(id=pk)
        if not request.user.is_superuser:
            fiche = models.PayementFournisseur.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except models.PayementFournisseur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.PayementFournisseurSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = serializers.PayementFournisseurSerializer(fiche, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save(modifie_par = request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fiche.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def retourFournisseurGETPOST(request):
    if request.method == 'GET':
        fiche = models.RetoursFournisseur.objects.all()
        if not request.user.is_superuser:
            fiche = models.RetoursFournisseur.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = serializers.RetorFournisseurSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.RetorFournisseurSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # serializer.instance.saisie_par = request.user
            serializer.save(saisie_par = request.user)
            for prod in serializer.instance.produits.all():


                prod.produit.qtte_retour_four += prod.quantite_retour
                prod.produit.save()
            caisse = serializer.instance.caisse
            caisse.montant_pay_four += serializer.instance.montant
            caisse.save()
                # objects.update(qtte_retour_four=F('qtte_retour_four') + prod.quantite_retour)#
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def retourFournisseurPk(request, pk):
    try:
        fiche = models.RetoursFournisseur.objects.get(id=pk)
        if not request.user.is_superuser:
            fiche = models.RetoursFournisseur.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except models.RetoursFournisseur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.RetorFournisseurSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = serializers.RetorFournisseurSerializer(fiche, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save(modifie_par = request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fiche.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

#--------------------------------------------------CLIENT---------------------------------------

@api_view(['GET','POST'])
def clientGETPOST(request):
    if request.method == 'GET':
        client = models.Client.objects.all()
        if not request.user.is_superuser:
            client = models.Client.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = serializers.ClientSerializer(client, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.ClientSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(saisie_par=request.user)
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def clientPk(request, pk):
    try:
        client = models.Client.objects.get(id=pk)
        if not request.user.is_superuser:
            client = models.Client.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except models.Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.ClientSerializer(client)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = serializers.ClientSerializer(client, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        client.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def venteClientGETPOST(request):
    if request.method == 'GET':
        fiche = models.FicheVenteClient.objects.all()
        if not request.user.is_superuser:
            fiche = models.FicheVenteClient.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = serializers.FicheVenteSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.FicheVenteSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.instance.reste_a_payer = (serializer.instance.prixTTC - serializer.instance.montant_reg_client)
            # serializer.instance.saisie_par = request.user
            serializer.save(saisie_par = request.user)
            for prod in serializer.instance.produits.all():

                prod.produit.qtte_vendue += prod.quantite
                prod.produit.save()
            solde = serializer.instance.total - serializer.instance.montant_reg_client
            serializer.instance.client.solde += solde
            serializer.instance.client.save()
            caisse = serializer.instance.caisse
            caisse.montant_vente_client += serializer.instance.montant_reg_client
            caisse.save
            client = serializer.instance.client
            client.solde += (serializer.instance.prixTTC - serializer.instance.montant_reg_client)
            client.save()
                # objects.update(qtte_retour_four=F('qtte_retour_four') + prod.quantite_retour)#
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def venteClientPk(request, pk):
    try:
        fiche = models.FicheVenteClient.objects.get(id=pk)
        if not request.user.is_superuser:
            fiche = models.FicheVenteClient.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except models.FicheVenteClient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.FicheVenteSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = serializers.FicheVenteSerializer(fiche, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save(modifie_par = request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fiche.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)


@api_view(['GET','POST'])
def payementClientGETPOST(request):
    if request.method == 'GET':
        fiche = models.PayementClient.objects.all()
        if not request.user.is_superuser:
            fiche = models.PayementClient.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = serializers.PayementClientSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.PayementClientSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # serializer.instance.saisie_par = request.user
            serializer.save(saisie_par = request.user)
            pay = serializer.instance
            pay.client.solde -= pay.montant
            pay.client.save()
            caisse = serializer.instance.caisse
            caisse.montant_pay_client += serializer.instance.montant
            caisse.save()

            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT', 'DELETE'])
def payementClientPk(request, pk):
    try:
        fiche = models.PayementClient.objects.get(id=pk)
        if not request.user.is_superuser:
            fiche = models.PayementClient.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except models.PayementClient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.PayementClientSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = serializers.PayementClientSerializer(fiche, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save(modifie_par = request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fiche.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def retourClientGETPOST(request):
    if request.method == 'GET':
        fiche = models.RetoursClient.objects.all()
        if not request.user.is_superuser:
            fiche = models.RetoursClient.objects.filter(selling_point=request.user.vendeur.selling_point)
        serializer = serializers.RetorClientSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.RetorClientSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # serializer.instance.saisie_par = request.user
            serializer.save(saisie_par = request.user)
            for prod in serializer.instance.produits.all():


                prod.produit.qtte_retour_client += prod.quantite_retour
                prod.produit.save()
            caisse = serializer.instance.caisse
            caisse.montant_retour_client += serializer.instance.montant
                # objects.update(qtte_retour_four=F('qtte_retour_four') + prod.quantite_retour)#
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def retourClientPk(request, pk):
    try:
        fiche = models.RetoursClient.objects.get(id=pk)
        if not request.user.is_superuser:
            fiche = models.RetoursClient.objects.filter(selling_point=request.user.vendeur.selling_point).get(id=pk)
    except models.RetoursClient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.RetorClientSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = serializers.RetorClientSerializer(fiche, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save(modifie_par = request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fiche.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)