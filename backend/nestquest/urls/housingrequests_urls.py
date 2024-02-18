from django.urls import path
from nestquest.views import housingrequests_views as views


urlpatterns = [
path('create/', views.createRequest, name="request-create"),
path('myrequests/', views.getMyRequests, name="requests"),
path('offerrequests/', views.getOfferRequests, name="requests"),
path('<str:pk>/', views.getRequest, name="request"),
path('delete/<str:pk>/', views.deleteRequest, name="request-delete"),
path('update/<str:pk>/', views.updateRequest, name="request-update"),
]
