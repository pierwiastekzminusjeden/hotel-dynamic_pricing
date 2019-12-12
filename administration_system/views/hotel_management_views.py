import datetime

from django.http import JsonResponse
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status

from administration_system.dynamic_pricing_module.dynamic_pricing_optimizer import DynamicPricingOptimizer
from ..dynamic_pricing_module.demand_generator import DemandGenerator
from ..dynamic_pricing_module.demand_web_scrapper import HotelPricesCollector
from ..models import Room, Reservation, PriceReservationDate
from ..serializers.dynamic_pricing_serializers import PricingSerializer
from ..serializers.hotel_management_serializers import ReservationSerializer, AvailableRoomWithPriceSerializer, \
    RoomSerializer, OptimizeFromAdminPanelSerializer

import threading

# Hotel system
class RoomView(ListCreateAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


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
        try:
            available_rooms = self.filter_reservations(room_type, from_date, to_date)
            prices_for_room = self.create_pricing_object(available_rooms[0], from_date, to_date)

            return Response({
                "room": RoomSerializer(available_rooms[0], context=self.get_serializer_context()).data,
                "price": prices_for_room
            })
        except:
            pass
        return JsonResponse({'message': 'Brak dostępnych pokoi tego typu'}, status=204)

    def filter_reservations(self, room_type, date_in, date_to):
        valid_rooms = Room.objects.filter(room_type__contains=room_type)
        reserved_rooms_id = Reservation.objects.filter(room__in=valid_rooms).filter(to_date__gt=date_in).filter(
            from_date__lte=date_to).values('room')
        reserved_rooms = Room.objects.filter(room_id__in=reserved_rooms_id)
        free_rooms = valid_rooms.difference(reserved_rooms).distinct()
        return free_rooms

    def create_pricing_object(self, room, date_in, date_to):
        current_date = date_in
        end_date = date_to
        prices = []
        while current_date <= end_date:
            prices.append(
                {'date': current_date, 'price': self.get_optimal_price(room, current_date)})
            current_date += datetime.timedelta(days=1)
        return prices

    def get_optimal_price(self, room, date):
        free_rooms = self.filter_reservations(room.room_type, date, date + datetime.timedelta(days=1)).count()
        ratio = free_rooms / Room.objects.all().count()
        print(free_rooms)
        price = room.base_price
        try:
            obj = PriceReservationDate.objects.get(date=date)
            print(obj)
            if 0 < ratio <= 0.25:
                price = obj.price_0_25
            elif 0.25 < ratio <= 0.5:
                price = obj.price_0_5
            elif 0.5 < ratio <= 0.75:
                price = obj.price_0_75
            elif 0.75 < ratio <= 1:
                price = obj.price_1_0
        except:
            pass
        return price


class OptimizeView(GenericAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works
    serializer_class = OptimizeFromAdminPanelSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        from_date = data.get("from_date")
        to_date = data.get("to_date")
        number_of_guests = data.get("number_of_guests")
        # export_concurency_prices_result_to_csv = request.data.get("concurrency_to_csv")
        # export_generated_demand_to_csv = request.data.get("demand_to_csv")
        # export_optimization_result_to_csv = request.data.get("optimize_to_csv")
        # optimize_to_db = request.data.get("optimize_to_db")
        thread1 = threading.Thread(target=self.run, args=(from_date, to_date, number_of_guests))
        thread1.start()
        return Response({'message': 'Przetważanie danych'}, status=status.HTTP_202_ACCEPTED)


    def run_web_scrapper(self, from_date, to_date, number_of_guests=2, save_data_to_file=True,
                         output_file_name='ceny_konkurencji'):
        webscrapper = HotelPricesCollector()
        data_frame = webscrapper.collect_data_in_range(from_date, to_date, number_of_guests)
        if save_data_to_file:
            webscrapper.export_data_to_csv(output_file_name)
        return data_frame


    def run_demand_generator(self, prices_data, max_demand_value=20, save_data_to_file=True,
                             output_file_name='popyt'):
        demand_generator = DemandGenerator()
        demand_generator.concurency_prices = prices_data
        demand = demand_generator.demand_generator_from_concurency_prices(max_demand_value)
        if save_data_to_file:
            demand_generator.export_data_to_csv(output_file_name)
        return demand


    def run_optimize(self, demand, save_data_to_db=False, save_data_to_file=True, output_file_name='wycena_pokoi'):
        pricing = DynamicPricingOptimizer()
        pricing.df_demand = demand
        pricing.optimize()
        optimization_result = pricing.save_optimize_to_df()
        if save_data_to_file:
            pricing.export_optimization_result_to_csv(output_file_name)
        if save_data_to_db:
            pricing.save_to_database()

        return optimization_result

    def run(self, from_date, to_date, room_type, save_optimization_res_to_db=False):
        scrapped_data = self.run_web_scrapper(from_date, to_date, room_type)
        demand = self.run_demand_generator(scrapped_data)
        optimization_result = self.run_optimize(demand, save_optimization_res_to_db)
        print(optimization_result)
        return Response({optimization_result.to_html})
