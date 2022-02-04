from functools import partial
from multiprocessing import context
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
# Create your views here.

@api_view(['GET','POST'])
def sellingPointGETPOST(request):
    if request.method == 'GET':
        selling_points = SellingPoint.objects.all()
        serializer = SellingPointSerializer(selling_points, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = SellingPointSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def sellingPointPk(request, pk):
    try:
        selling_point = SellingPoint.objects.get(id=pk)
    except SellingPoint.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = SellingPointSerializer(selling_point)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SellingPointSerializer(selling_point, data=request.data)
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
        serializer = CaisseSerializer(caisses, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = CaisseSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def caissePk(request, pk):
    try:
        caisse = Caisse.objects.get(id=pk)
    except Caisse.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CaisseSerializer(caisse)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CaisseSerializer(caisse, data=request.data)
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
        serializer = ProduitSerializer(produit, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = ProduitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def produitPk(request, pk):
    try:
        produit = Produit.objects.get(id=pk)
    except Produit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ProduitSerializer(produit)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProduitSerializer(produit, data=request.data)
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
        serializer = FicheCreditSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = FicheCreditSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.instance.
            serializer.save(saisie_par = request.user)
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def ficheCreditPk(request, pk):
    try:
        fiche = FicheCredit.objects.get(id=pk)
    except FicheCredit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = FicheCreditSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = FicheCreditSerializer(fiche, data=request.data, partial=True)
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
        serializer = FicheDebitSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = FicheDebitSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.instance.
            serializer.save(saisie_par = request.user)
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def ficheDebitPk(request, pk):
    try:
        fiche = FicheDebit.objects.get(id=pk)
    except FicheDebit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = FicheDebitSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = FicheDebitSerializer(fiche, data=request.data, partial=True)
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
        serializer = serializers.VendeurSerializer(vendeur, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.VendeurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def vendeurPk(request, pk):
    try:
        vendeur = models.Vendeur.objects.get(id=pk)
    except Vendeur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.VendeurSerializer(vendeur)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = VendeurSerializer(vendeur, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        vendeur.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def fournisseurGETPOST(request):
    if request.method == 'GET':
        four = models.Fournisseur.objects.all()
        serializer = serializers.FournisseurSerializer(four, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.FournisseurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def fournisseurPk(request, pk):
    try:
        four = models.Fournisseur.objects.get(id=pk)
    except Fournisseur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.FournisseurSerializer(four)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = FournisseurSerializer(four, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        four.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)
    
@api_view(['GET','POST'])
def ficheACFournisseurGETPOST(request):
    if request.method == 'GET':
        fiche = models.FicheAchatCommandeFournisseur.objects.all()
        serializer = serializers.FicheACFournisseurSerializer(fiche, many=True)
        return Response (serializer.data)
    if request.method == 'POST':
        serializer = serializers.FicheACFournisseurSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # serializer.instance.saisie_par = request.user
            serializer.save(saisie_par = request.user)
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def ficheACFournisseurPk(request, pk):
    try:
        fiche = models.FicheAchatCommandeFournisseur.objects.get(id=pk)
    except models.FicheAchatCommandeFournisseur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.FicheACFournisseurSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = serializers.FicheACFournisseurSerializer(fiche, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fiche.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)


@api_view(['GET','POST'])
def payementFournisseurGETPOST(request):
    if request.method == 'GET':
        fiche = models.PayementFournisseur.objects.all()
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
    except models.PayementFournisseur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = serializers.PayementFournisseurSerializer(fiche)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = serializers.PayementFournisseurSerializer(fiche, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(modifie_par = request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fiche.delete()
        return Response (status= status.HTTP_204_NO_CONTENT)

