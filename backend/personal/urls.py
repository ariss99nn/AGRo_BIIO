from django.urls import path
from .views import PersonalListCreateView, PersonalDetailView

urlpatterns = [
    path('personal/', PersonalListCreateView.as_view(), name='personal-list-create'),
    path('personal/<int:pk>/', PersonalDetailView.as_view(), name='personal-detail'),
]
