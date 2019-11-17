# Generated by Django 2.2.7 on 2019-11-13 12:43

import administration_system.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('RoomId', models.AutoField(primary_key=True, serialize=False)),
                ('RoomNumber', models.IntegerField(default=1)),
                ('RoomType', models.CharField(choices=[(administration_system.models.RoomTypes('Single room'), 'Single room'), (administration_system.models.RoomTypes('Double standard room'), 'Double standard room'), (administration_system.models.RoomTypes('Triple room'), 'Triple room'), (administration_system.models.RoomTypes('Double room with kings bed'), 'Double room with kings bed')], default=administration_system.models.RoomTypes('Double standard room'), max_length=1)),
                ('BasePricePerNight', models.IntegerField(default=0)),
                ('OptimalPricePerNightInCurrentWeek', models.IntegerField(default=0, null=True)),
                ('ImagePath', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]