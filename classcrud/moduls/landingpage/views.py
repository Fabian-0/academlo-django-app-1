from django.shortcuts import render, redirect
from .forms import Login, Register
from moduls.students.models import Student
from moduls.professors.models import Professor
# Create your views here.

def login(request):
  httpVerb = request.method

  if httpVerb == 'GET':
    loginForm = Login()
    context = {
      "title": "Login",
      'form': loginForm
    }
    return render(request, '../templates/landingpage/login.html', context)
  if httpVerb == 'POST':
    loginForm = Login(request.POST)

    if loginForm.is_valid():
      accoutnType = request.POST["account_type"]
      try:
        if accoutnType == 'student':
          student = Student.objects.get(email=request.POST['email'])
          if student.password == request.POST['password']:
            return redirect(f'/student/{student.id}/')
        if accoutnType == 'professor':
          professor = Professor.objects.get(email=request.POST['email'])
          if professor.password == request.POST['password']:
            return redirect(f'/professor/{professor.id}/')
        return redirect('/')
      except:
        return redirect('/')

def register(request):

  httpVerb = request.method
 
  if httpVerb == 'GET':
    registerForm = Register()
    context = {
      "title": "Register",
      "form": registerForm
    }
    return render(request, '../templates/landingpage/register.html', context)
  if httpVerb == 'POST':
    registerForm = Register(request.POST)
    if registerForm.is_valid():
      accoutnType = request.POST["account_type"]
      dataDict = {
        "first_name": request.POST["first_name"],
        "last_name": request.POST["last_name"],
        "email": request.POST["email"],
        "avatar": request.POST["avatar"],
        "password": request.POST["password"],
      }

      if accoutnType == 'student':
        Student.objects.create(**dataDict)
      if accoutnType == 'professor':
        Professor.objects.create(**dataDict)
      return redirect('/')
    else:
      context = {
        "title": "Register",
        "form": registerForm
      }
      registerForm = Register(request.POST)
      return render(request, '../templates/landingpage/register.html', context)