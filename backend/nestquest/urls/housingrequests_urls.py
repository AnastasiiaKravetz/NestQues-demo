from django.urls import path
from nestquest.views import housingrequests_views as views


urlpatterns = [
path('', views.getRequests, name="requests"),
path('<str:pk>/', views.getRequest, name="request"),
]