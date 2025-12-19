from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Maquinaria
from .serializers import MaquinariaSerializer


class MaquinariaListCreateAPIView(APIView):

    def get(self, request):
        maquinarias = Maquinaria.objects.all()
        serializer = MaquinariaSerializer(maquinarias, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MaquinariaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MaquinariaDetailAPIView(APIView):

    def get_object(self, pk):
        try:
            return Maquinaria.objects.get(pk=pk)
        except Maquinaria.DoesNotExist:
            return None

    def get(self, request, pk):
        maquinaria = self.get_object(pk)
        if not maquinaria:
            return Response(
                {"error": "Maquinaria no encontrada"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = MaquinariaSerializer(maquinaria)
        return Response(serializer.data)

    def put(self, request, pk):
        maquinaria = self.get_object(pk)
        if not maquinaria:
            return Response(
                {"error": "Maquinaria no encontrada"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = MaquinariaSerializer(maquinaria, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        maquinaria = self.get_object(pk)
        if not maquinaria:
            return Response(
                {"error": "Maquinaria no encontrada"},
                status=status.HTTP_404_NOT_FOUND
            )

        maquinaria.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
