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


class ReservationList(ListCreateAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


class ReservationDetail(RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


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

        return Response({
            "error": "available room not found"
        })

    @staticmethod
    def create_pricing_object(room, date_in, date_to):
        current_date = date_in
        end_date = date_to
        prices = []
        while current_date <= end_date:
            prices.append({'date': current_date, 'price': 0})
            current_date += datetime.timedelta(days=1)
        return prices


class PricingForDateRangeView(ListAPIView):
    serializer_class = PricingSerializer

    def get_queryset(self, *args, **kwargs):
        queryset_list = PriceReservationDate.objects.all()
        room_type = self.request.GET.get("q")
        from_date = self.request.GET.get("q2")
        to_date = self.request.GET.get("q3")
        if room_type:
            queryset_list = self.get_pricing_objects(room_type, from_date, to_date)
        return queryset_list

    def get_pricing_objects(self, room_type, date_in, date_to):
        free_rooms = Room.filter_reservations(room_type, date_in, date_to)
        num_available_rooms = free_rooms.count()
        num_all_rooms= Room.objects.all().count()
        num_available = num_available_rooms - num_all_rooms

        try:
            if free_rooms:
                self.create_pricing_object(free_rooms[0], date_in, date_to)
        except:
            print("already done")

        queryset = PriceReservationDate.objects.filter(date__range=[date_in, date_to]).filter(room__exact=free_rooms[0]).distinct()
        print(queryset)
        return queryset



class OptimizeView(GenericAPIView):
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
        return Response({
            'Przesłano plik poprawnie'
        })
