from rest_framework import serializers
from django.contrib.auth.models import User
from .models import HousingOffer, HousingRequest, Message, HousingOfferImage
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', '_id' ]

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name
    
    def get__id(self, obj):
        return obj.id


class HousingOfferImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = HousingOfferImage
        fields = '__all__'

class HousingOfferSerializer(serializers.ModelSerializer):
    images = HousingOfferImageSerializer(many=True, required = False)
    class Meta:
        model = HousingOffer
        fields = '__all__'
        

class HousingRequestSerializer(serializers.ModelSerializer):
    housing_offer = HousingOfferSerializer()
    class Meta:
        model = HousingRequest
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'




class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)