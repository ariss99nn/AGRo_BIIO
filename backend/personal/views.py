from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .models import ModelPersona
from .serializers import PersonaSerializer

class PersonaListCreateView(APIView):
    def get(self, request):
        personas = ModelPersona.objects.all()
        serializer = PersonaSerializer(personas, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PersonaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class PersonaDetailView(APIView):
    def get_object(self, pk):
        try:
            return ModelPersona.objects.get(pk=pk)
        except ModelPersona.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        persona = self.get_object(pk)
        serializer = PersonaSerializer(persona)
        return Response(serializer.data)

    def put(self, request, pk):
        persona = self.get_object(pk)
        serializer = PersonaSerializer(persona, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        persona = self.get_object(pk)
        persona.delete()
        return Response(status=204)