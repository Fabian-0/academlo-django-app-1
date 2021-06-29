from django.db import models
from moduls.classes.models import Class
from django.contrib.auth.models import User
# Create your models here.

class Student(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, default=0)
  avatar = models.CharField(max_length=255, default='https://picsum.photos/200/300')
  classes = models.ManyToManyField(Class)