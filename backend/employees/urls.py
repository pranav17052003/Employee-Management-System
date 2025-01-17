from django.contrib import admin
from django.urls import path, include
from employees import views
from .views import EmployeeListCreateAPIView, EmployeeRetrieveUpdateDeleteAPIView, UserRegistrationAPIView
from .views import login_view, csrf_token_view, get_user_info, export_employees_csv



urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('api/user-info/', get_user_info, name ="user_info"),
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('csrf_token/', csrf_token_view, name='csrf_token'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('employees/', EmployeeListCreateAPIView.as_view(), name='employee_list_create'),
    path('employees/<int:pk>/', EmployeeRetrieveUpdateDeleteAPIView.as_view(), name='employee_retrieve_update_delete'),
    path('employees/<int:employee_id>/soft-delete/', views.soft_delete_employee, name='soft_delete_employee'),
    path('export-csv/', export_employees_csv, name='export_employees_csv'),
]