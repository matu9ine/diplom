from django.db import models
from django.contrib.auth.models import User
from datetime import date
    
class UserAddition(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='addition')
    name = models.TextField()
    role = models.TextField()
    phone = models.TextField()
    master_type = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name

class Call(models.Model):
    master_id = models.IntegerField(null=True, blank=True)
    master_name = models.TextField(null=True, blank=True)
    master_phone = models.TextField(null=True, blank=True)
    client_id = models.IntegerField(null=True, blank=True)
    client_phone = models.TextField(null=True, blank=True)
    client_name = models.TextField(null=True, blank=True)
    client_email = models.TextField(null=True, blank=True)
    created_date = models.DateField(default=date.today())
    end_date = models.DateField(null=True, blank=True)
    note = models.TextField(blank=True)
    type = models.TextField(blank=True)

    def __str__(self):
        return self.note

class Consult(models.Model):
    name = models.TextField()
    phone = models.TextField()
    email = models.TextField()
    question = models.TextField()
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.question
    
class Questionnaire(models.Model):
    client_id = models.IntegerField()
    name = models.TextField()
    phone = models.TextField()
    type = models.TextField(null=True)
    note = models.TextField()

    def __str__(self):
        return self.name