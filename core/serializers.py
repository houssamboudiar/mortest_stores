from rest_framework import serializers
from .models import SellingPoint, Caisse

class SellingPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellingPoint
        fields = ['name', 'societé', 'adress', 'wilaya',
        'ville', 'telephone', 'fax', 'email', 'articles_dimposition']

class CaisseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellingPoint
        fields = ['selling_point', 'nom', 'caisse', 'wilaya',
        'ville', 'solde']