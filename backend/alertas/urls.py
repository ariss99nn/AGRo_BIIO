from django.urls import path
from .views import AlertRuleListView, AlertRuleDetailView

urlpatterns = [
    path('', AlertRuleListView.as_view(), name='alert-rule-list-create'),
    path('<int:pk>/', AlertRuleDetailView.as_view(), name='alert-rule-detail'),
]