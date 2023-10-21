from django.urls import path
from . import views

urlpatterns = [
    path("test/", views.test),
    path("get-crime-data/",views.CrimeLocationListView.as_view())
]