# employees/serializers.py

from rest_framework import serializers
from .models import Employee
from django.contrib.auth.models import User


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        
        
        
# employees/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User, Group

class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)
    role = serializers.ChoiceField(choices=["Admin", "Viewer"], write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'role']

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        role = validated_data.pop('role')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password1']
        )
        user.is_staff = True
        user.save()
        group, _ = Group.objects.get_or_create(name=role)
        user.groups.add(group)
        
        return user

