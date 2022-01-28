from random import choices
from rest_framework import serializers
from .models import SellingPoint, Caisse

class SellingPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellingPoint
        fields = ['name', 'societé', 'adress', 'wilaya',
        'ville', 'telephone', 'fax', 'email', 'articles_dimposition']

# class CaisseSerializer(serializers.Serializer):
#     selling_point = serializers.CharField()
#     nom = serializers.CharField(max_length=200)
#     caisse = serializers.CharField(max_length=200)
#     wilaya = serializers.CharField(max_length=200)
#     ville = serializers.CharField(max_length=200)
#     solde = serializers.IntegerField()
    

#     def create(self, validated_data):
#         selling_point = SellingPoint.objects.get(id=int(validated_data["selling_point"]))
#         nom = validated_data["nom"]
#         caisse = validated_data["caisse"]
#         wilaya = validated_data["wilaya"]
#         ville = validated_data["ville"]
#         solde = validated_data["solde"]
#         return Caisse.objects.create(selling_point=selling_point, nom=nom, caisse=caisse,
#         wilaya=wilaya, ville=ville, solde=solde)

#     def update(self, instance, validated_data):
#         instance.nom = validated_data.get('nom', instance.nom)
#         instance.caisse = validated_data.get('caisse', instance.caisse)
#         instance.wilaya = validated_data.get('wilaya', instance.wilaya)
#         instance.ville = validated_data.get('ville', instance.ville)
#         instance.solde = validated_data.get('solde', instance.solde)

#         instance.save()
#         return instance
    

class CaisseSerializer(serializers.ModelSerializer):
    # selling_point = SellingPointSerializer(many=True, read_only=True)
    selling_point = serializers.SlugRelatedField(queryset=SellingPoint.objects.all(),
    slug_field='id')
    # nom = serializers.CharField(max_length=200)
    # caisse = serializers.CharField(max_length=200)
    # wilaya = serializers.CharField(max_length=200)
    # ville = serializers.CharField(max_length=200)
    # solde = serializers.IntegerField()
    class Meta:
        model = Caisse
        fields = ['selling_point', 'nom', 'caisse', 'wilaya', 'ville', 'solde']
        depth = 1

    