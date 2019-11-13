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

from administration_system.views import RegistrationView, LoginView, UserView, RoomViewSet, RegistrationAdminView, \
    ChangePasswordView

urlpatterns = [
    # path('api/auth', include('knox.urls')),
    path('auth/register', RegistrationView.as_view()),
    path('auth/register-admin', RegistrationAdminView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('auth/user', UserView.as_view()),
    path('auth/change-password', ChangePasswordView.as_view()),
    path('auth/logout', LogoutView.as_view(), name='knox_logout'),

    path('rooms/all-rooms', RoomViewSet.as_view())

]
