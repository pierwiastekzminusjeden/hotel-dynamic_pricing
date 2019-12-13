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


class AvailableRoomWithPriceSerializer(serializers.Serializer):
    room_type = serializers.ChoiceField(required=True, choices=ROOM_TYPES)
    from_date = serializers.DateField(required=True)
    to_date = serializers.DateField(required=True)


class OptimizeFromAdminPanelSerializer(serializers.Serializer):
    from_date = serializers.DateField(required=True)
    to_date = serializers.DateField(required=True)
    number_of_guests = serializers.IntegerField(required=True, max_value=4, min_value=1)
    optimize_to_db = serializers.BooleanField(required = False)


class PricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceReservationDate
        fields = '__all__'