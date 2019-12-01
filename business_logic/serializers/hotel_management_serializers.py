from rest_framework import serializers

from ..models import Room, Reservation, PriceReservationDate, ROOM_TYPES


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

#
# class PriceReservationDateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PriceReservationDate
#         fields = '__all__'
#
# class PricingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PriceReservationDate
#         fields = '__all__'
#         # fields = ('date', 'price', 'room')


class AvailableRoomWithPriceSerializer(serializers.Serializer):
    room_type = serializers.ChoiceField(required=True, choices=ROOM_TYPES)
    from_date = serializers.DateField(required=True)
    to_date = serializers.DateField(required=True)


class PricesPerDay(serializers.Serializer):
    room = serializers.IntegerField(required=True)
    date = serializers.DateField(required=True)
    price = serializers.IntegerField(required=True)

