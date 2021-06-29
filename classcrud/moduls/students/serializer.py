from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from moduls.students.models import Student

class StudentSerializer(ModelSerializer):
  class Meta:
    model = Student
    fields = ('avatar', 'classes')
    depth = 1

class SendStudentSerializer(ModelSerializer):
  student = StudentSerializer(read_only=True, )
  
  class Meta:
    model = User
    fields = ('pk','first_name', 'username', 'student',  )
