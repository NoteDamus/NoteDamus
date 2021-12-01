from rest_framework import serializers
from .models import User, Folder, Note, Image, Source
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                  'first_name',
                  'last_name',
                  'email',
                  'user_type')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                  'first_name',
                  'last_name',
                  'email',
                  'user_type',
                  'password')
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
            user_type=validated_data["user_type"],
            password=validated_data["password"])

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = "__all__"


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = "__all__"
