from django.db import models
from moduls.professors.models import Professor
# Create your models here.

class Class(models.Model):
  name = models.CharField(max_length=150)
  professor = models.ForeignKey(Professor, null=True, blank=True, on_delete=models.CASCADE)