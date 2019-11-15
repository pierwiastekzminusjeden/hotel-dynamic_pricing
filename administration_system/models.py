from django.db import models
from django.contrib.auth.models import User
from enum import Enum


class RoomTypes(Enum):
    SINGLE = 'Single room'
    STANDARD = 'Double standard room'
    TRIPLE = 'Triple room'
    DELUX = 'Double room with kings bed'


class Room(models.Model):

    RoomId = models.AutoField(primary_key=True)
    RoomNumber = models.IntegerField(default = 1)
    RoomType = models.CharField(max_length = 1, choices = [(rt, rt.value) for rt in RoomTypes], default = RoomTypes.STANDARD)
    BasePricePerNight = models.IntegerField(default=0, )
    OptimalPricePerNightInCurrentWeek = models.IntegerField(default=0, null=True)
    ImagePath = models.CharField(max_length=255, blank=True, null=True)
