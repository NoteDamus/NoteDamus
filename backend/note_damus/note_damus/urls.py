from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='NoteDamus API')

urlpatterns = [
    url('^$', schema_view),
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
]
