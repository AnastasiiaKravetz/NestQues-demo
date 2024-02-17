from django.urls import path
from nestquest.views import housingoffers_views as views

urlpatterns = [
    path('', views.getOffers, name="offers"),
    path('create/', views.createOffer, name="offer-create"),
    path('<str:pk>/', views.getOffer, name="offer"),
    path('delete/<str:pk>/', views.deleteOffer, name="offer-delete"),
    path('update/<str:pk>/', views.updateOffer, name="offer-update"),
]
