# employees/admin.py
from django.contrib import admin
from .models import Employee

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name','phone', 'department', 'designation', 'salary', 'is_active')
    search_fields = ('name', 'email', 'phone', 'department', 'designation')
    list_filter = ('department', 'designation', 'is_active')
