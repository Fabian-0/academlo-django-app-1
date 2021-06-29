from moduls.classes.models import Class
from moduls.classes.serializer import ClassSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser


class ClassViewSet(ModelViewSet):
  queryset = Class.objects.all()
  serializer_class = ClassSerializer
  permission_classes = [AllowAny]

  def get_permissions(self):
    print(self.request.method)
    method = self.request.method
    if method == 'GET':
      print('test', self.request.user)
      permissions = (AllowAny, )
    elif method == 'POST' or method == 'PUT' or method == 'PATCH':
      permissions = (IsAuthenticated, )
    elif method == 'DELETE':
      print(method)
      permissions = (IsAuthenticated, )
    else:
      permissions = (IsAdminUser, )

    return [permission() for permission in permissions]