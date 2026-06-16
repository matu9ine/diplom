from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Такой аккаунт уже существует")]
    )
    password = serializers.CharField(
        write_only=True,
        required=False
    )
    name = serializers.CharField(source='addition.name')
    phone = serializers.CharField(source='addition.phone')
    role = serializers.CharField(source='addition.role', required=False)
    master_type = serializers.CharField(source='addition.master_type', required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'master_type', 'role', 'name', 'phone']

    def create(self, validated_data):
        
        addition_data = validated_data.pop('addition', {})
        
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        
        UserAddition.objects.create(
            user=user,
            name=addition_data.get('name', ''),
            phone=addition_data.get('phone', ''),
            role=addition_data.get('role', 'user')
        )
        
        return user
    
    def update(self, instance, validated_data):

        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        
        addition_data = validated_data.pop('addition', {})
        if hasattr(instance, 'addition'):
            addition = instance.addition
            for attr, value in addition_data.items():
                setattr(addition, attr, value)
            addition.save()
        
        return super().update(instance, validated_data)
    
    def validate_email(self, value):
        return value.lower().strip()
    
class CallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Call
        fields = '__all__'

class ConsultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consult
        fields = '__all__'

class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = '__all__'