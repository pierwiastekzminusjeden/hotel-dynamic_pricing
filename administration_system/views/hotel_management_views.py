from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView, ListAPIView
from rest_framework.response import Response
from django.core.files.storage import FileSystemStorage

import datetime

from administration_system.business_logic.dynamic_pricing import DynamicPricing
from ..models import Room, Reservation, PriceReservationDate
from ..serializers.hotel_management_serializers import ReservationSerializer, AvailableRoomWithPriceSerializer, \
    RoomSerializer, OptimizeFromAdminPanelSerializer
from ..serializers.dynamic_pricing_serializers import PricingSerializer

#Hotel system
class RoomView(ListCreateAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    @staticmethod
    def filter_reservations(room_type, date_in, date_to):
        valid_rooms = Room.objects.filter(room_type__contains=room_type)
        reserved_rooms_id = Reservation.objects.filter(room__in=valid_rooms).filter(to_date__gt=date_in).filter(
            from_date__lte=date_to).values('room')
        reserved_rooms = Room.objects.filter(room_id__in=reserved_rooms_id)
        free_rooms = valid_rooms.difference(reserved_rooms).distinct()
        return free_rooms


class RoomDetail(RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class ReservationView(ListCreateAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


class ReservationDetail(RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


class PricingForDateRangeView(ListAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works

    queryset = PriceReservationDate.objects.all()
    serializer_class = PricingSerializer


class PricingForDateRangeDetail(RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works
    queryset = PriceReservationDate.objects.all()
    serializer_class = PricingSerializer


class AvailableRoomWithPriceView(GenericAPIView):
    serializer_class = AvailableRoomWithPriceSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        room_type = data.get("room_type")
        from_date = data.get("from_date")
        to_date = data.get("to_date")
        if room_type:
            available_rooms = RoomView.filter_reservations(room_type, from_date, to_date)
            prices_for_room = self.create_pricing_object(available_rooms[0], from_date, to_date)

            return Response({
                "room": RoomSerializer(available_rooms[0], context=self.get_serializer_context()).data,
                "price": prices_for_room
            })

        return JsonResponse({'message': 'Brak dostępnych pokoi tego typu'}, status=204)

    @staticmethod
    def create_pricing_object(room, date_in, date_to):
        current_date = date_in
        end_date = date_to
        prices = []
        while current_date <= end_date:
            prices.append({'date': current_date, 'price': AvailableRoomWithPriceView.get_optimal_price(room, current_date)})
            current_date += datetime.timedelta(days=1)
        return prices

    @staticmethod
    def get_optimal_price(room, date):
        free_rooms = RoomView.filter_reservations(room.room_type, date, date + datetime.timedelta(days=1)).count()
        ratio = free_rooms/Room.objects.all().count()
        print(free_rooms)
        price = room.base_price

        obj = PriceReservationDate.objects.get(date=date)

        if 0 < ratio <= 0.25 and obj:
            price = obj.price_0_25
        elif 0.25 < ratio <= 0.5 and obj:
            price = obj.price_0_5
        elif 0.5 < ratio <= 0.75 and obj:
            price = obj.price_0_75
        elif 0.75 < ratio <= 1 and obj:
            price = obj.price_1_0

        return price

class OptimizeView(GenericAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works
    serializer_class = OptimizeFromAdminPanelSerializer

    def post(self, request, *args, **kwargs):
        run_optimize = request.data.get("optimize")
        demand_file = request.FILES["demand_file"]
        fs = FileSystemStorage()
        fs.save(demand_file.name, demand_file)
        if run_optimize:
            pricing = DynamicPricing()
            pricing.import_demand_from_file('input_data', demand_file.name)
            pricing.optimize()
            pricing.save_optimize_to_df()
            pricing.export_optimization_result_to_csv('output_data')
            pricing.save_to_database()
        return JsonResponse({'message': 'Przetważanie danych'}, status=202)
