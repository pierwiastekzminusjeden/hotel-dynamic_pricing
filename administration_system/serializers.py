from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .models import Room, Reservation, PriceReservationDate
from .models import ROOM_TYPES

#Registration serializers
class RegistrationUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user


class RegistrationAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        user.is_staff = True
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials.")


class ChangePasswordSerializer(serializers.Serializer):
    new_passwd = serializers.CharField(required=True)
    current_passwd = serializers.CharField(required=True)


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'


class PriceReservationDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceReservationDate
        fields = '__all__'

class PricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceReservationDate
        fields = '__all__'
        # fields = ('date', 'price', 'room')


class AvailableRoomWithPriceSerializer(serializers.Serializer):
    room_type = serializers.ChoiceField(required=True, choices=ROOM_TYPES)
    from_date = serializers.DateField(required=True)
    to_date = serializers.DateField(required=True)



class PricesPerDay(serializers.Serializer):
    room = serializers.IntegerField(required=True)
    date = serializers.DateField(required=True)
    price = serializers.IntegerField(required=True)