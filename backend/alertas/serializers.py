from rest_framework import serializers
from alertas.models import AlertRule, AlertInstance

class AlertRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlertRule
        fields = [
            "id",
            "tipo",
            "target_type",
            "target_id",
            "parametros",
            "mensaje_template",
            "activo",
            "last_triggered",
        ]
        
class AlertInstanceSerializer(serializers.ModelSerializer):
    rule = AlertRuleSerializer(read_only=True)
    
    class Meta:
        model = AlertInstance
        fields = [
            "id",
            "rule",
            "created_at",
            "leida",
            "referencia",
        ]