from rest_framework import serializers

from administration_system.models import PriceReservationDate


class PricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceReservationDate
        fields = '__all__'
        # fields = ('date', 'price', 'room')