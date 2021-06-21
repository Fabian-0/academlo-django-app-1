from django.shortcuts import render
from moduls.professors.models import Professor
from moduls.classes.models import Class
# Create your views here.

def professors(request, professorId):
  httpVerb = request.method
  if httpVerb == 'GET':
    professor = Professor.objects.get(id=professorId)
    classes = Class.objects.filter(professor_id=professorId)
    context = {
      "title": "Professor",
      "professor": professor,
      "classes": classes,
    }
    return render(request, '../templates/professors/index.html', context)

def classDetails(request, classId):
  httpVerb = request.method
  if httpVerb == 'GET':
    classData = Class.objects.get(id=classId)

    context = {
      "title": "Class Detail",
      "class": classData,
      "students": classData.student_set.all(),
    }
    return render(request, '../templates/classes/details.html', context)