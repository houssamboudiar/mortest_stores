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