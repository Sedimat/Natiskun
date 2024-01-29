from django.contrib.auth.views import LoginView
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('search/<int:id>', views.search, name='search'),
    path('add/<int:id>', views.add, name='add'),
    path("contact/<str:name>", views.contact, name="contact"),
    path("login", LoginView.as_view(), name='login'),
    path("logout", views.logout_view, name='logout'),
]