from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from moduls.professors.models import Professor

class ProfessorSerializer(ModelSerializer):
  class Meta:
    model = Professor
    fields = ('avatar', 'class_set' )
    depth = 1

class SendProfessorSerializer(ModelSerializer):
  professor = ProfessorSerializer(required=True)
  
  class Meta:
    model = User
    fields = ('pk','first_name', 'username', 'professor',  )
    depth = 1
