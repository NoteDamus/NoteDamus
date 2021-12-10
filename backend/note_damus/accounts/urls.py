from django.urls import path, include
from django.conf.urls import url, include
from .views import RegisterAPI, LoginAPI, UserAPI
from .viewsets import (
    FolderViewSet,
    NoteViewSet,
    ImageViewSet
)
from rest_framework import routers
from knox import views as knox_views

router = routers.DefaultRouter()

router.register("folders", FolderViewSet, "folders")
router.register("notes", NoteViewSet, "notes")
router.register("images", ImageViewSet, "images")

urlpatterns = [
    url(r'^', include(router.urls)),
    path("auth", include("knox.urls")),
    path("auth/register", RegisterAPI.as_view()),
    path("auth/login", LoginAPI.as_view()),
    path("auth/user", UserAPI.as_view()),
    path("auth/logout", knox_views.LogoutView.as_view(), name="knox_logout"),
]
