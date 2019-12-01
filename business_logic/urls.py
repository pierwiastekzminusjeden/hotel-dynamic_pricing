"""hotel_dynamic_pricing URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from knox.views import LogoutView

from .views import authentication_views, hotel_management_views


urlpatterns = [
    # path('api/auth', include('knox.urls')),
    path('auth/register', authentication_views.RegistrationView.as_view()),
    path('auth/register-admin', authentication_views.RegistrationAdminView.as_view()),
    path('auth/login', authentication_views.LoginView.as_view()),
    path('auth/user', authentication_views.UserView.as_view()),
    path('auth/change-password', authentication_views.ChangePasswordView.as_view()),
    path('auth/logout', LogoutView.as_view(), name='knox_logout'),

    path('rooms/', hotel_management_views.RoomView.as_view()),
    path('room/<int:pk>', hotel_management_views.RoomDetail.as_view()),
    path('reservations', hotel_management_views.ReservationList.as_view()),
    path('reservation/<int:pk>', hotel_management_views.ReservationDetail.as_view()),
    path('get-prices/', hotel_management_views.PricingForDateRangeView.as_view()),
    path('available-room/', hotel_management_views.AvailableRoomWithPriceView.as_view()),

]
