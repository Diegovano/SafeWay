from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .serializers import CrimeLocationSerializer
from .models import CrimeLocation


@api_view(['GET'])
def test(request):
    data = {"response": "This is a test"}
    return Response(data, status=status.HTTP_200_OK)

class CrimeLocationListView(generics.ListAPIView):
    queryset = CrimeLocation.objects.all()
    serializer_class = CrimeLocationSerializer


