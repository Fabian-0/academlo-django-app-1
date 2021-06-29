from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from rest_framework import serializers
#none 2
class UserAutherializar(ModelSerializer):
  class Meta:
    model = User
    fields = ('email', 'password')

class UserProfessorSerializer(ModelSerializer):
  account_type = serializers.CharField(max_length=100)
  avatar = serializers.URLField(max_length=255)
  class Meta:
    model = User
    fields = ('username', 'first_name', 'last_name', 'email', 'avatar', 'password', 'account_type', )