from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        
        if user:
            login(request, user)
            return redirect('dashboard')
        else:
            return render(request, 'login.html', {'error': 'Invalid username or password'})
    return render(request, 'login.html')


def logout_view(request):
    logout(request)
    return redirect('login')

from django.http import HttpResponseForbidden
@login_required
def dashboard(request):
    if request.user.groups.filter(name='Admin').exists():
        return render(request, 'admin_dashboard.html')
    elif request.user.groups.filter(name='Viewer').exists():
        return render(request, 'viewer_dashboard.html')
    else:
        return HttpResponseForbidden("APKE PASS PERMISSIONS NAHI HAI!.")
    
    


# defining api view using rest_framework generic views or viewSet

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer
from django.shortcuts import get_object_or_404

class EmployeeListCreateAPIView(APIView):
    print("Api list called wiht method.**********")
    def get(self, request):
        
        """Retrieve a list of all active employees."""
        search_query = request.GET.get('search', '')
        employees = Employee.objects.filter(is_active=True, name__icontains=search_query)
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
        employee = get_object_or_404(Employee, pk=pk, is_active=True)
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
        employee = get_object_or_404(Employee, pk=pk)
        employee.is_active = False
        employee.save()
        return Response({'message': 'Employee deleted successfully'}, status=status.HTTP_200_OK)








































# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.contrib.auth import authenticate

# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         user = authenticate(username=username, password=password)

#         if user:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             })
#         return Response({'error': 'Invalid credentials'}, status=400)

# class LogoutView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         try:
#             refresh_token = request.data["refresh"]
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response({"message": "Successfully logged out"}, status=200)
#         except Exception as e:
#             return Response({"error": str(e)}, status=400)
