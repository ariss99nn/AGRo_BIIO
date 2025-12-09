from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404

from .models import Personal
from .serializers import PersonalSerializer


# ---------------------------
# LISTAR / CREAR PERSONAL
# ---------------------------

class PersonalListCreateView(APIView):

    def get(self, request):
        personal = Personal.objects.all()
        serializer = PersonalSerializer(personal, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PersonalSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ---------------------------
# DETALLE / EDITAR / BORRAR PERSONAL
# ---------------------------

class PersonalDetailView(APIView):

    def get_object(self, pk):
        try:
            return Personal.objects.get(pk=pk)
        except Personal.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        personal = self.get_object(pk)
        serializer = PersonalSerializer(personal)
        return Response(serializer.data)

    def put(self, request, pk):
        personal = self.get_object(pk)
        serializer = PersonalSerializer(personal, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        personal = self.get_object(pk)
        personal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
