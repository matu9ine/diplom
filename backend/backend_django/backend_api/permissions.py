from rest_framework.permissions import BasePermission

class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.addition.role == 'manager'

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.addition.role == 'admin'
    
class IsMaster(BasePermission):
    def has_permission(self, request, view):
        return request.user.addition.role == 'master'
    
class ConsultPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        else:
            return (request.user.is_authenticated and
                    request.user.addition.role in ['admin', 'manager'])
        
class FastCallPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        else:
            return (request.user.is_authenticated and
                    request.user.addition.role in ['admin', 'manager', 'master'])
        
class CallPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST' and request.user.is_authenticated:
            return True
        else:
            return (request.user.is_authenticated and
                    request.user.addition.role in ['admin', 'manager', 'master'])

class QuestionnairePermission(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST' and request.user.is_authenticated:
            return True
        else:
            return (request.user.is_authenticated and
                    request.user.addition.role in ['admin', 'manager'])