from django.template import Library

register = Library()

def addClase(formObject, nameClase):
  return formObject.as_widget(attrs={"class": nameClase})

register.filter('addClass', addClase)