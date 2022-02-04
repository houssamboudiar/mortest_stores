from rest_framework import serializers

from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    user_type_data = (('1',"Directeur"),('2',"Vendeur"),('3',"Autre"))
    user_type = serializers.ChoiceField(default='2',choices=user_type_data)
    class Meta:
        model = CustomUser
        fields = ['username','email', 'first_name', 'last_name', 'date_of_birth']