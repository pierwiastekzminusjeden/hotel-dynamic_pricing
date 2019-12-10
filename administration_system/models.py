from django.db import models, transaction
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from jsonfield import JSONField
# import json

ROOM_TYPES = (
    ('SINGLE', 'Single room'),
    ('STANDARD', 'Double standard room')
)

class Room(models.Model):
    room_id     = models.AutoField(primary_key=True)
    room_number = models.IntegerField(default=1)
    room_type   = models.CharField(max_length=8, choices=ROOM_TYPES, default='STANDARD')
    base_price  = models.IntegerField(default=100)


class Reservation(models.Model):
    reservation_id      = models.AutoField(primary_key=True)
    room                = models.ForeignKey(Room, on_delete=models.PROTECT)
    client              = models.EmailField(max_length=254)  # models.ForeignKey(Client, on_delete=models.CASCADE)
    reservation_date    = models.DateTimeField(auto_now_add=True)
    from_date           = models.DateField()
    to_date             = models.DateField()
    price               = models.IntegerField(default=0)


class PriceReservationDate(models.Model):
    date            = models.DateField(default='', primary_key=True)
    price_1_0       = models.IntegerField(default=100)
    price_0_75      = models.IntegerField(default=100)
    price_0_5       = models.IntegerField(default=100)
    price_0_25      = models.IntegerField(default=100)
