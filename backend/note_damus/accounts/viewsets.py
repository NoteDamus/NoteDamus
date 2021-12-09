from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import (
    FolderSerializer,
    NoteSerializer,
    ImageSerializer,
    SourceSerializer
)
from .models import Folder, Note, Image, Source
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend

class FolderViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    filter_backends = [DjangoFilterBackend,]

    filterset_fields = {
        'user': ['exact'],
        'title' : ['icontains', 'exact']
    }
    serializer_class = FolderSerializer

    def get_queryset(self):
        return Folder.objects.all()


class NoteViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    filter_backends = [DjangoFilterBackend,]
    filterset_fields = {
        'folder' : ['exact']
    }
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.all()


class ImageViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    filter_backends = [DjangoFilterBackend,]
    serializer_class = ImageSerializer

    def get_queryset(self):
        return Image.objects.all()


class SourceViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    filter_backends = [DjangoFilterBackend,]
    serializer_class = SourceSerializer

    def get_queryset(self):
        return Source.objects.all()
