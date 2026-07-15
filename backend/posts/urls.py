from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.PostViewSet, basename='post')

urlpatterns = [
    path('<int:post_pk>/comments/', views.CommentViewSet.as_view({
        'get': 'list', 'post': 'create'
    })),
    path('<int:post_pk>/comments/<int:pk>/', views.CommentViewSet.as_view({
        'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'
    })),
    path('', include(router.urls)),
]
