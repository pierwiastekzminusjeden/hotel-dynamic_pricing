from rest_framework import  permissions, generics, status
from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView, \
    RetrieveUpdateDestroyAPIView, GenericAPIView, RetrieveAPIView, ListAPIView
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.admin.views.decorators import staff_member_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

from .serializers import RegistrationUserSerializer, UserSerializer, LoginUserSerializer, RegistrationAdminSerializer, \
    ChangePasswordSerializer, ReservationSerializer, \
    PricingSerializer, AvailableRoomWithPriceSerializer
import datetime

from .models import Room, Reservation, PriceReservationDate
from .serializers import RoomSerializer

#Authorization
class RegistrationView(GenericAPIView):
    serializer_class = RegistrationUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


@method_decorator(staff_member_required, name='dispatch')
class RegistrationAdminView(generics.GenericAPIView):
    serializer_class = RegistrationAdminSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginView(GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = ChangePasswordSerializer
    model = User

    def post(self, request, *args, **kwargs):
        self.object = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if not self.object.check_password(serializer.data.get("current_passwd")):
            return Response({"current_passwd": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
        self.object.set_password(serializer.data.get("new_passwd"))
        self.object.save()
        return Response({
            "user": UserSerializer(self.object, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(self.object)[1]
        })

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


#
# class AddPricesView(GenericAPIView):
#     serializer_class = PricingSerializer
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
#         serializer.is_valid(raise_exception=True)
#         data = serializer.validated_data
#         serializer.save()
#         # data.save()
#         return Response({
#             'done':'done'
#         })

#dostępne tylko dla autoryzowanych userów
# @method_decorator(staff_member_required, name='dispatch') #doesn't work fine

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

    def get_pricing_objects(self, room_type, date_in, date_to ):
        free_rooms = Room.filter_reservations(room_type, date_in, date_to)
        try:
            if free_rooms:
                self.create_pricing_object(free_rooms[0], date_in, date_to)
        except:
            print("already done")

        queryset = PriceReservationDate.objects.filter(date__range=[date_in, date_to]).filter(room__exact=free_rooms[0]).distinct()
        print(queryset)
        return queryset