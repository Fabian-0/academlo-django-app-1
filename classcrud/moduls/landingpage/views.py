from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from moduls.professors.serializer import SendProfessorSerializer
from moduls.students.serializer import SendStudentSerializer
from moduls.landingpage.serializer import UserProfessorSerializer
from moduls.professors.models import Professor
from moduls.students.models import Student


# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getProfile(request):
  user = request.user
  try:
    if user.student:
      toSend = SendStudentSerializer(user)
      return Response(status=status.HTTP_200_OK, data=toSend.data)
  except AttributeError:
    pass
  try:
    if user.professor:
      toSend = SendProfessorSerializer(user)
      return Response(status=status.HTTP_200_OK, data=toSend.data)
  except AttributeError:
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])

def register(request):
  try:

    isValidUser = UserProfessorSerializer(data=request.data)
    if not isValidUser.is_valid():
      return Response(status=status.HTTP_400_BAD_REQUEST, data={"errors" : isValidUser.error_messages})
    
    userData = {**isValidUser.validated_data}
    newUser = User.objects.create_user(userData['username'], userData['email'], userData['password'])
    newUser.first_name = userData['first_name']
    newUser.last_name = userData['last_name']
    newUser.save()

    if userData["account_type"] == 'professor':
      Professor.objects.create(user=newUser)
      return Response(status=status.HTTP_201_CREATED)

    if userData["account_type"] == 'student':
      Student.objects.create(user=newUser)
      return Response(status=status.HTTP_201_CREATED)
    newUser.delete()
    return Response(status=status.HTTP_400_BAD_REQUEST)
  except:
    return Response(status=status.HTTP_400_BAD_REQUEST)