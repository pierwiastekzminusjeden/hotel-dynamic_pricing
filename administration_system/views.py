from rest_framework import viewsets, permissions, generics, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.admin.views.decorators import staff_member_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

from .serializers import RegistrationUserSerializer, UserSerializer, LoginUserSerializer, RegistrationAdminSerializer, \
    ChangePasswordSerializer

from .models import Room
from .serializers import RoomSerializer


class RegistrationView(generics.GenericAPIView):
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


class LoginView(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(UpdateAPIView):
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


#
# class ChangePasswordView(generics.GenericAPIView):
#
#     def post(self, request, *args, **kwargs):
#         username = None
#         if request.user.is_authenticated():
#             username = request.user.username
#         u = User.objects.get(username__exact='john')
#
#         data = request.data



#dostępne tylko dla autoryzowanych userów
@method_decorator(staff_member_required, name='dispatch')
class RoomViewSet(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
