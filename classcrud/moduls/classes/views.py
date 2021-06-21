from django.shortcuts import render, redirect
from moduls.classes.models import Class
from moduls.professors.models import Professor
from moduls.students.models import Student
# Create your views here.

def viewClasses(request, studentId):
  httpVerb = request.method
  if httpVerb == 'GET':
    classes = Class.objects.filter()
    context = {
      "title": "Classes",
      "classes": classes,
      "student": studentId
    }
    return render(request, '../templates/classes/index.html', context)


def addClass(request, professorId):
  httpVerb = request.method
  if httpVerb == 'POST':
    dataClass = {
      "name": request.POST['name'],
      "professor_id": professorId,
    }
    Class.objects.create(**dataClass)
    return redirect(f'/professor/{professorId}/')
  if httpVerb == 'GET':
    professor = Professor.objects.get(id=professorId)

    context = {
      "title": "Professor Profile",
      "professor": professor,
    }
    return render(request, '../templates/professors/profile.html', context)

def studentDetail(request, studentId):
  httpVerb = request.method
  if httpVerb == 'GET':
    student = Student.objects.get(id=studentId)
    
    context = {
      "title": "student Profile",
      "student": student,
    }
    return render(request, '../templates/students/profile.html', context)