"""classcrud URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from moduls.landingpage.views import login, register
from moduls.professors.views import professors, classDetails
from moduls.students.views import students, joinClass
from moduls.classes.views import addClass, viewClasses, studentDetail
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', login),
    path('register/', register),
    path('professor/<int:professorId>/', professors),
    path('student/<int:studentId>/', students),
    path('class/<int:professorId>/', addClass),
    path('class/<int:classId>/details/', classDetails),
    path('class/student/<int:studentId>/details/', studentDetail),
    path('student/<int:studentId>/<int:classId>/', joinClass),
    path('classes/<int:studentId>/', viewClasses ),
]
