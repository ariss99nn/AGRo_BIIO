from rest_framework.views import APIView
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response

class AlertRuleListView(APIView):
    def get(self, request):
        from alertas.models import AlertRule
        from alertas.serializers import AlertRuleSerializer

        alert_rules = AlertRule.objects.all()
        serializer = AlertRuleSerializer(alert_rules, many=True)
        return Response(serializer.data)
    def post(self, request):
        from alertas.models import AlertRule
        from alertas.serializers import AlertRuleSerializer

        serializer = AlertRuleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AlertRuleDetailView(APIView):
    def get_object(self, pk):
        from alertas.models import AlertRule
        try:
            return AlertRule.objects.get(pk=pk)
        except AlertRule.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        from alertas.serializers import AlertRuleSerializer

        alert_rule = self.get_object(pk)
        serializer = AlertRuleSerializer(alert_rule)
        return Response(serializer.data)

    def put(self, request, pk):
        from alertas.serializers import AlertRuleSerializer

        alert_rule = self.get_object(pk)
        serializer = AlertRuleSerializer(alert_rule, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        alert_rule = self.get_object(pk)
        alert_rule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
            
