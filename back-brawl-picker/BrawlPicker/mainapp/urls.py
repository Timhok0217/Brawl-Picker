from django.template.defaulttags import url
from django.urls import path, re_path

from django.views.generic import TemplateView
from . import views

urlpatterns = [
    re_path(r'^api/$', views.index, name='index'),
    path('ip', views.ip, name='ip')
    # re_path('', views.index, name='index'),
]