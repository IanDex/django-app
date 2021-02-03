from .models import Todo
from .serializers import TodoSerializer
from .paginations import CustomPagination
from rest_framework import generics
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
class ListTodo(generics.ListCreateAPIView):
    queryset = Todo.objects.filter(id=1).values_list()

    serializer_class = TodoSerializer
    pagination_class = CustomPagination

    def perform_create(self, serializer):
        kwargs = {
            'user': self.request.user
        }

        serializer.save(**kwargs)

    def get_queryset(self):
        queryset = Todo.objects.filter(user_id=self.request.user.id)
        return queryset


@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
class DetailTodo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
