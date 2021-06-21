from django.shortcuts import render, redirect
from moduls.students.models import Student
from moduls.classes.models import Class
# Create your views here.
def students(request, studentId):
  httpVerb = request.method

  if httpVerb == 'GET':
    student = Student.objects.get(id=studentId)

    context = {
      "title": "Student",
      "student": student,
      "classes": student.classes.all(),
    }
    return render(request, '../templates/students/index.html', context)

def joinClass(request, studentId, classId):
  httpVerb = request.method

  if httpVerb == 'GET':
    student = Student.objects.get(id=studentId)
    flag = True
    for classObj in student.classes.all():
      if classObj.id == classId:
        flag = False
        break
    if flag:
      addClass = Class.objects.get(id=classId)
      student.classes.add(addClass)
    return redirect(f'/student/{studentId}')