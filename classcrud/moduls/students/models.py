from django.db import models
from moduls.classes.models import Class

# Create your models here.

class Student(models.Model):
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  email = models.EmailField(max_length=100)
  avatar = models.CharField(max_length=255, default='https://picsum.photos/200/300')
  password = models.CharField(max_length=15, null=True)
  classes = models.ManyToManyField(Class)