from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group


from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.views.decorators.csrf import ensure_csrf_cookie

from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

from django.middleware.csrf import get_token
from django.http import JsonResponse

@ensure_csrf_cookie
def csrf_token_view(request):
    token = get_token(request)
    return JsonResponse({'csrftoken': token})



from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import Group

@csrf_exempt
def login_view(request):
    """Handles user login."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            user = authenticate(request, username=username, password=password)
            print(user,"ok")
            if user:
                login(request, user)
                role = "Viewer"
                if user.groups.filter(name="Admin").exists():
                    print(user)
                    role = "Admin"
                return JsonResponse({'message': 'Login successful', 'role': role, 'username': user.username}, status=200)
            else:
                return JsonResponse({'error': 'Invalid username or password'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
        
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})


def logout_view(request):
    """Handles user logout."""
    logout(request)
    return JsonResponse({'message': 'Logout successful'}, status=200)



from django.http import JsonResponse, HttpResponseForbidden
from django.contrib.auth.decorators import login_required

@login_required
def dashboard(request):
    """API endpoint for determining the dashboard to render based on user role."""
    user = request.user
    if user.groups.filter(name='Admin').exists():
        return JsonResponse({"role": "Admin", "message": f"Welcome {user.username}! You have Admin privileges."})
    elif user.groups.filter(name='Viewer').exists():
        return JsonResponse({"role": "Viewer", "message": f"Welcome {user.username}! You have Viewer privileges."})
    else:
        return HttpResponseForbidden("You do not have permission to access this dashboard.")
        


# employees/views.py
# employees/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer

class UserRegistrationAPIView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

@login_required
def get_user_info(request):
    user = request.user
    if user.is_authenticated:
        return JsonResponse({'username': user.username})
    else:
        return JsonResponse({'error': 'User is not authenticated'}, status=403)

# views.py

# views.py
# backend/views.py


# defining api view using rest_framework generic views or viewSet

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination

class EmployeePagination(PageNumberPagination):
   page_size = 4
   page_size_query_param = 'page_size'
   max_page_size = 100 
   def get_paginated_response(self, data):
        return Response({
            'results': data,
            'current_page': self.page.number,
            'total_pages': self.page.paginator.num_pages,
            'total_count': self.page.paginator.count
        })

from django.db.models import  Q
class EmployeeListCreateAPIView(APIView):
    print("Api list called wiht method.**********")
    def get(self, request):
        print(f"Query params: {request.GET}")
        page = request.GET.get('params[page]', None)
        print(f"Requested page: {page}")
        """Retrieve a list of all active employees."""
        search_query = request.GET.get('search', '')
        
        employees = Employee.objects.filter((Q(name__icontains=search_query) | Q(department__icontains=search_query)) & Q(is_active=True) ).order_by("id")
        paginator = EmployeePagination()
        paginated_employees = paginator.paginate_queryset(employees, request)
        print(paginated_employees)
        if paginated_employees is not None:
            serializer = EmployeeSerializer(paginated_employees, many=True)
            return paginator.get_paginated_response(serializer.data)

    # Fallback for non-paginated response
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Create a new employee."""
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    
class EmployeeListt(APIView):
    print("Api list called wiht method.**********")
    def get(self, request):
        print(f"Query params: {request.GET}")
        page = request.GET.get('params[page]', None)
        print(f"Requested page: {page}")
        """Retrieve a list of all active employees."""
        search_query = request.GET.get('search', '')
        
        employees = Employee.objects.filter((Q(name__icontains=search_query) | Q(department__icontains=search_query)) ).order_by("id")
        paginator = EmployeePagination()
        paginated_employees = paginator.paginate_queryset(employees, request)
        print(paginated_employees)
        if paginated_employees is not None:
            serializer = EmployeeSerializer(paginated_employees, many=True)
            return paginator.get_paginated_response(serializer.data)

    # Fallback for non-paginated response
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Create a new employee."""
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeRetrieveUpdateDeleteAPIView(APIView):
    def get(self, request, pk):
        """Retrieve details of a single employee."""
        employee = get_object_or_404(Employee, pk=pk)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        """Update details of an employee."""
        employee = get_object_or_404(Employee, pk=pk)
        serializer = EmployeeSerializer(employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Soft-delete an employee."""
        employee = get_object_or_404(Employee, pk=pk, is_active=True)
        employee.delete()  # Calls the overridden delete method
        return Response({'message': 'he ha Employee deleted successfully'}, status=status.HTTP_200_OK)



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Employee
import json

@csrf_exempt
def soft_delete_employee(request, employee_id):
    if request.method == "POST":
        try:
            employee = Employee.objects.get(id=employee_id)
            employee.is_active = False  # Set the employee as inactive
            employee.save()
            return JsonResponse({"message": "Employee soft deleted successfully."}, status=200)
        except Employee.DoesNotExist:
            return JsonResponse({"error": "Employee not found."}, status=404)
    return JsonResponse({"error": "Invalid request method."}, status=400)


import csv
from django.http import HttpResponse
from .models import Employee

def export_employees_csv(request):
    response =  HttpResponse(content_type = "text/csv")
    response['Content-Disposition'] = 'attachment; filename="employees.csv"'
    writer = csv.writer(response)
    writer.writerow(["ID", "name", "email", "phone", "department", "designation", "salary", "Active", "created_at", "updated_at"])
    employees = Employee.objects.all()
    
    for employee in employees:
        writer.writerow([employee.id, employee.name, employee.email, employee.phone, employee.department, employee.designation, employee.salary, employee.is_active, employee.created_at, employee.updated_at])
        
    return response
    
    
    