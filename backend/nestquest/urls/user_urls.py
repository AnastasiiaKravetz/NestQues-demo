from django.urls import path
from nestquest.views import user_views as views


urlpatterns = [
path('login/', views.MyTokenObtainPairView.as_view(), name='token-obtain_pair'),
path('profile/', views.getUserProfile, name="user-profile"),
path('register/', views.registerUser, name="register"),
path('profile/update/', views.updateUserProfile, name="user-profile-update"),
]