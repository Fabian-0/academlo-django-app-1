from rest_framework.serializers import ModelSerializer
from moduls.classes.models import Class

class ClassSerializer(ModelSerializer):
  class Meta:
    model = Class
    fields = ('name', 'professor',)