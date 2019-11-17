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
    room_type = models.CharField(max_length = 1, choices = [(rt, rt.value) for rt in RoomTypes], default = RoomTypes.STANDARD)
    base_price_per_night = models.IntegerField(default=0, )
    image_path = models.CharField(max_length=255, blank=True, null=True)
