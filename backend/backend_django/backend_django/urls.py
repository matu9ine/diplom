"""
URL configuration for backend_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path, include
from django.urls import re_path as url
from backend_api.views import *
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('users/', UserList.as_view(), name='user-list'),
    path('masters/', MastersList.as_view(), name='master-list'),
    path('masters/calls/', MasterWorkCalls.as_view(), name='master-type-calls-list'),
    path('masters/calls/work/', ActiveMasterWorkCalls.as_view(), name='active-master-work-calls-list'),
    path('masters/questionnaire/', QuestionnaireList.as_view(), name='master-questionnaire'),
    path('masters/questionnaire/<int:pk>/', QuestionnaireDetail.as_view(), name='questionnaire-detail'),
    path('managers/', ManagersList.as_view(), name='manager-list'),
    path('questionnaire/', QuestionnaireList.as_view(), name='questionnaire-list'),
    path('user/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('call/<int:pk>/', CallDetail.as_view(), name='call-detail'),
    path('calls/', CallList.as_view(), name='call-list'),
    path('mycalls/', UserActiveCalls.as_view(), name='user-calls'),
    path('mycalls/history/', UserHistoryCalls.as_view(), name='user-calls'),
    path('consults/', ConsultList.as_view(), name='consult-list'),
    path('consult/<int:pk>/', ConsultDetail.as_view(), name='consult-detail'),
    path('activecalls/', ActiveCalls.as_view(), name='active-calls'),
    path('completedcalls/', CompletedCalls.as_view(), name='completed-calls'),
    path('fastcalls/', FastCall.as_view(), name='fast-calls'),
    path('fastcalls/active/', ActiveWorkFastCalls.as_view(), name='fast-calls')
]