from django.db import models
# from django.contrib.auth.models import AbstractUser

# # Create your models here.
# class CustomUser(AbstractUser):
#     is_admin = models.BooleanField(default=False)
#     is_viewer = models.BooleanField(default=False)
#     groups = models.ManyToManyField(
#         'auth.Group', 
#         related_name='customuser_groups', 
#         blank=True, 
#         help_text='The groups this user belongs to.'
#     )
#     user_permissions = models.ManyToManyField(
#         'auth.Permission', 
#         related_name='customuser_user_permissions', 
#         blank=True, 
#         help_text='Specific permissions for this user.'
#     )



class Employee(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    department = models.CharField(max_length=50)
    designation = models.CharField(max_length=50)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    