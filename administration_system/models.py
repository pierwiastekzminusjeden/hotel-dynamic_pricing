from django.db import models

ROOM_TYPES = (
    ('STATIC', 'Pokój o statyczna cena'),
    ('DYNAMIC', 'Pokój o dynamiczna cena')
)

class Room(models.Model):
    room_number = models.IntegerField(default=1, primary_key=True)
    room_type   = models.CharField(max_length=8, choices=ROOM_TYPES, default='STATIC')
    base_price  = models.IntegerField(default=100)


class Reservation(models.Model):
    reservation_id      = models.AutoField(primary_key=True)
    room                = models.ForeignKey(Room, on_delete= models.CASCADE)
    client              = models.EmailField(max_length=254)
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
