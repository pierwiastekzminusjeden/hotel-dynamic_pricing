from rest_framework import serializers

from business_logic.models import PriceReservationDate


class PricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceReservationDate
        fields = '__all__'
        # fields = ('date', 'price', 'room')