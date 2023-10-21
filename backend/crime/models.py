from django.db import models

# Create your models here.
class CrimeLocation(models.Model):
    """Contains the longitude and latitude of a crime."""
    longitude = models.FloatField()
    latitude = models.FloatField()