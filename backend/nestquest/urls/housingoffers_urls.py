from django.urls import path
from nestquest.views import housingoffers_views as views


urlpatterns = [
path('', views.getOffers, name="offers"),
path('<str:pk>/', views.getOffer, name="offer"),
]