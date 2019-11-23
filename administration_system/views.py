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
    ChangePasswordSerializer, ReservationSerializer

from .models import Room, Reservation
from .serializers import RoomSerializer


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

#test it
class AvailableRoomsView(ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self, *args, **kwargs):
        queryset_list = Room.objects.all()
        room_type = self.request.GET.get("q")
        from_date = self.request.GET.get("q2")
        to_date = self.request.GET.get("q3")
        if room_type:
            queryset_list = self.filter_reservations(room_type, "2019-11-20", "2019-12-20")
        return queryset_list

    def filter_reservations(self, room_type, date_in, date_to):
        valid_rooms = Room.objects.filter(room_type__contains=room_type)
        print(valid_rooms)
        reserved_rooms_id = Reservation.objects.filter(room__in=valid_rooms).filter(to_date__gt=date_in).filter(from_date__lte=date_to).values('room')
        reserved_rooms = Room.objects.filter(room_id__in=reserved_rooms_id)
        return valid_rooms.difference(reserved_rooms).distinct()


#dostępne tylko dla autoryzowanych userów
# @method_decorator(staff_member_required, name='dispatch') #doesn't work fine
class RoomList(ListCreateAPIView):
    # permission_classes = [IsAuthenticated, ]  #it works
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


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
