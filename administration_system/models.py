from django.db import models


ROOM_TYPES = (
    ('SINGLE', 'Single room'),
    ('STANDARD', 'Double standard room'),
    ('TRIPLE', 'Triple room'),
    ('DELUX', 'Double room with kings bed'),
)


class Room(models.Model):
    room_id = models.AutoField(primary_key=True)
    room_number = models.IntegerField(default = 1)
    room_type = models.CharField(max_length = 1, choices = ROOM_TYPES, default = 'STANDARD')
    base_price = models.IntegerField(default=0)
    image_path = models.CharField(max_length=255, blank=True, null=True)


# User?
# class Client(models.Model):
#     CLientId = models.AutoField(primary_key=True)
#     FirstName = models.CharField(max_length=30, blank=True, null=True)
#     SecondName = models.CharField(max_length=30, blank=True, null=True)
#     email = models.EmailField(max_length=254)

class Reservation(models.Model):
    reservation_id = models.AutoField(primary_key=True) #rename
    room = models.ForeignKey(Room)
    client = models.EmailField(max_length=254) #models.ForeignKey(Client, on_delete=models.CASCADE)
    reservation_date = models.DateTimeField(auto_now_add=True)
    from_date = models.DateField()
    to_date = models.DateField()
    price = models.IntegerField(default=0)


class PriceReservationDate(models.Model):
    date = models.DateField()
    price = models.IntegerField(default=0)
    reservation = models.ForeignKey(Reservation, blank=True, null=True)

    class Meta:
        unique_together = ("date", "reservation")
