from django.db import models, transaction
from django.db.models.signals import post_save
from django.dispatch import receiver
from jsonfield import JSONField
import json

ROOM_TYPES = (
    ('SINGLE', 'Single room'),
    ('STANDARD', 'Double standard room'),
    ('TRIPLE', 'Triple room'),
    ('DELUX', 'Double room with kings bed'),
)


class Room(models.Model):
    room_id     = models.AutoField(primary_key=True)
    room_number = models.IntegerField(default=1)
    room_type   = models.CharField(max_length=1, choices=ROOM_TYPES, default='STANDARD')
    base_price  = models.IntegerField(default=0)
    image_path  = models.CharField(max_length=255, blank=True, null=True)


class Reservation(models.Model):
    reservation_id      = models.AutoField(primary_key=True)
    room                = models.ForeignKey(Room, on_delete=models.PROTECT)
    client              = models.EmailField(max_length=254)  # models.ForeignKey(Client, on_delete=models.CASCADE)
    reservation_date    = models.DateTimeField(auto_now_add=True)
    from_date           = models.DateField()
    to_date             = models.DateField()
    price               = models.IntegerField(default=0)
    pricesPerDay        = JSONField(default="[]", blank=False, null=False)


class PriceReservationDate(models.Model):
    date        = models.DateField(default='')
    price       = models.IntegerField(default=0)
    room        = models.ForeignKey(Room, on_delete=models.CASCADE, default='')
    reservation = models.ForeignKey(Reservation, blank=True, null=True, on_delete=models.CASCADE)

    @staticmethod
    @receiver(post_save, sender=Reservation)
    def create_PriceReservationDate(sender, instance, **kwargs):
        reservation = instance
        room = instance.room
        jsonstring= instance.pricesPerDay
        transaction.set_autocommit(False)
        try:
            data = json.loads(jsonstring)
            PriceReservationDate.objects.bulk_create([PriceReservationDate(date=obj['date'], price = obj['price'],room=room,reservation=reservation) for obj in data])
        except:
            transaction.rollback()
            raise
        else:
            transaction.commit()
        finally:
            transaction.set_autocommit(True)
        #
    class Meta:
        unique_together = ["date", "room"]
