from django.urls import path
from .views import AlertRuleListView, AlertRuleDetailView

urlpatterns = [
    path('alertas/', AlertRuleListView.as_view(), name='alert-rule-list-create'),
    path('alertas/<int:pk>/', AlertRuleDetailView.as_view(), name='alert-rule-detail'),
]