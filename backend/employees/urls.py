from django.contrib import admin
from django.urls import path, include
from employees import views
from .views import EmployeeListCreateAPIView, EmployeeRetrieveUpdateDeleteAPIView


# register the viewset in urls.py using RESTFRAMEWORK USING DEFAULT ROUTER
# from rest_framework.routers import DefaultRouter
# from .views import EmployeeViewSet

# router = DefaultRouter()
# router.register(r'employees', EmployeeViewSet, basename='employees')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('employees/', EmployeeListCreateAPIView.as_view(), name='employee_list_create'),
    path('employees/<int:pk>/', EmployeeRetrieveUpdateDeleteAPIView.as_view(), name='employee_retrieve_update_delete'),
]