from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from .permissions import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from .serializer import *
from django.contrib.auth.models import User

# Create your views here.

class UserList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated & (IsAdmin | IsManager)]
    serializer_class = UserSerializer
    def get_queryset(self):
        return User.objects.filter(addition__role='user').order_by('id')
    
class MastersList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated & (IsAdmin | IsManager)]
    serializer_class = UserSerializer
    def get_queryset(self):
        return User.objects.filter(addition__role='master').order_by('id')

class ManagersList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated & IsAdmin]
    serializer_class = UserSerializer
    def get_queryset(self):
        return User.objects.filter(addition__role='manager').order_by('id')

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated & (IsAdmin | IsManager)]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CallList(generics.ListCreateAPIView):
    permission_classes = [CallPermission]
    queryset = Call.objects.all().order_by('id')
    serializer_class = CallSerializer

class CallDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated & (IsAdmin | IsManager | IsMaster)]
    queryset = Call.objects.all()
    serializer_class = CallSerializer

class UserActiveCalls(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CallSerializer
    def get_queryset(self):
        return Call.objects.filter(client_id=self.request.user.id, end_date__isnull=True).order_by('id')
    
class MasterWorkCalls(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated & (IsAdmin | IsManager | IsMaster)]
    serializer_class = CallSerializer
    def get_queryset(self):
        return Call.objects.filter(type=self.request.user.addition.master_type, master_id__isnull=True, end_date__isnull=True).order_by('id')
    
class ActiveMasterWorkCalls(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated & (IsAdmin | IsManager | IsMaster)]
    serializer_class = CallSerializer
    def get_queryset(self):
        return Call.objects.filter(master_id=self.request.user.id, end_date__isnull=True).order_by('id')
    
class UserHistoryCalls(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CallSerializer
    def get_queryset(self):
        return Call.objects.filter(client_id=self.request.user.id, end_date__isnull=False).order_by('id')

class ActiveCalls(generics.ListCreateAPIView):
    serializer_class = CallSerializer
    def get_queryset(self):
        return Call.objects.filter(end_date__isnull=True, client_id__isnull=False).order_by('id')
    
class ActiveWorkFastCalls(generics.ListCreateAPIView):
    serializer_class = CallSerializer
    def get_queryset(self):
        return Call.objects.filter(end_date__isnull=True, client_id__isnull=True, master_id__isnull=True).order_by('id')

class CompletedCalls(generics.ListCreateAPIView):
    serializer_class = CallSerializer
    def get_queryset(self):
        return Call.objects.filter(end_date__isnull=False).order_by('id')

class ConsultList(generics.ListCreateAPIView):
    permission_classes = [ConsultPermission]
    queryset = Consult.objects.all().order_by('id')
    serializer_class = ConsultSerializer

class ConsultDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated & (IsAdmin | IsManager)]
    queryset = Consult.objects.all()
    serializer_class = ConsultSerializer

class FastCall(generics.ListCreateAPIView):
    permission_classes = [FastCallPermission]
    serializer_class = CallSerializer
    def get_queryset(self):
        return Call.objects.filter(client_id__isnull=True, end_date__isnull=True).order_by('id')
    
class QuestionnaireList(generics.ListCreateAPIView):
    permission_classes = [QuestionnairePermission]
    queryset = Questionnaire.objects.all().order_by('id')
    serializer_class = QuestionnaireSerializer

class QuestionnaireDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated & (IsAdmin | IsManager)]
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)