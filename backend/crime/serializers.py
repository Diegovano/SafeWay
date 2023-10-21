# crime/serializers.py

from rest_framework import serializers
from .models import CrimeLocation

class CrimeLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrimeLocation
        fields = "__all__"
