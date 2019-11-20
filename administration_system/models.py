from django.db import models
from django.contrib.auth.models import User
from enum import Enum


class RoomTypes(str, Enum):
    SINGLE = 'Single room'
    STANDARD = 'Double standard room'
    TRIPLE = 'Triple room'
    DELUX = 'Double room with kings bed'


class Room(models.Model):

    room_id = models.AutoField(primary_key=True)
    room_number = models.IntegerField(default = 1)
    room_type = models.CharField(max_length=255)
    # room_type = models.CharField(max_length = 1, choices = [(rt, rt.value) for rt in RoomTypes], default = RoomTypes.STANDARD)
    base_price_per_night = models.IntegerField(default=0, )
    image_path = models.CharField(max_length=255, blank=True, null=True)


# User?
# class Client(models.Model):
#     CLientId = models.AutoField(primary_key=True)
#     FirstName = models.CharField(max_length=30, blank=True, null=True)
#     SecondName = models.CharField(max_length=30, blank=True, null=True)
#     email = models.EmailField(max_length=254)


class Reservation(models.Model):
    ReservationId = models.AutoField(primary_key=True)
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    # Client = models.ForeignKey(Client, on_delete=models.CASCADE)
    reservation_date = models.DateTimeField(auto_now_add=True)
    from_date = models.DateField()
    to_date = models.DateField()
    price = models.IntegerField(default=0)