from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('devis/', views.quote_page, name='quote_page'),
    path('api/get_data/', views.get_data, name='get_data'),
    path('api/chat/', views.chat_api, name='chat'),
    path('thanks/', views.thanks_page, name='thanks_page'),
    path('serarch/', views.search_page, name='search_page'),
    path('api/artisans/', views.get_artisans_api, name='artisans_api'),


]
