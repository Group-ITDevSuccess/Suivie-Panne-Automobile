from django.urls import path
from .views import register_user, login_user, logout_user, token_user,get_all_user

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('token/me/', token_user, name='token_user'),
    path('get-all-user/', get_all_user, name='get_all_user')
]
