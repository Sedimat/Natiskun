from django.contrib.auth.views import LoginView
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('search/<int:id>', views.search, name='search'),
    path('add/<int:id>', views.add, name='add'),
    path('add_group', views.add_group, name='add_group'),
    path("contact/<str:name>", views.contact, name="contact"),
    path("group/<int:id>", views.group, name="group"),
    path("user", views.user, name="user"),
    path("login", LoginView.as_view(), name='login'),
    path("logout", views.logout_view, name='logout'),
    path("get_data/<str:name>/<int:id>", views.get_data, name='get_data'),
    path("get_data0/<str:name>/<int:id>", views.get_data0, name='get_data0'),
    path("index_js", views.index_js, name='index_js'),
    path("new_mess_js", views.new_mess_js, name='new_mess_js'),
    path("post_mess", views.post_mess, name='post_mess'),
]