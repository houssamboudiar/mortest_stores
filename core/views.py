from django.shortcuts import render
from django.shortcuts import render
from django.http.response import JsonResponse
from .models import SellingPoint, Caisse
from rest_framework.decorators import api_view
from .serializers import SellingPointSerializer, CaisseSerializer

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
        return Response (serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET','PUT', 'DELETE'])
def sellingPointPk(request, pk):
    try:
        selling_point = SellingPoint.objects.get(id=pk)
    except SellingPoint.DoesNotExists:
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
        serializer = CaisseSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.data, status=status.HTTP_201_CREATED)




    
