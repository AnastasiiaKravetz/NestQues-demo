from django.urls import path
from nestquest.views import messages_views as views


urlpatterns = [
path('create/', views.createMessage, name="message-create"),
path('mymessage/', views.getMyMessages, name="messages"),
#path('requestsmessage/', views.getRequestMessages, name="messages"),
path('<str:pk>/', views.getMessage, name="message"),
path('delete/<str:pk>/', views.deleteMessage, name="message-delete"),
path('update/<str:pk>/', views.updateMessage, name="message-update"),
]