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
    to_date = serializers.DateField(required=False)
    room_type = serializers.ChoiceField(required=True, choices=ROOM_TYPES)
    optimize_to_db = serializers.BooleanField(required = True)
    concurrency_to_csv = serializers.BooleanField(required = True)
    demand_to_csv = serializers.BooleanField(required = True)
    optimize_to_csv = serializers.BooleanField(required = True)