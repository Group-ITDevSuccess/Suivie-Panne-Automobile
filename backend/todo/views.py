from rest_framework import status, permissions, response, views
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Todo
from .permissions import IsOwner
from .serializers import TodoSerializer


# Create your views here.
class TodoListApiView(views.APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        todos = Todo.objects.filter(user=request.user.id)
        serializer = TodoSerializer(todos, many=True)
        custom_data = {
            'count': todos.count,
            'result': serializer.data,
            'message': "List of todo items retrieved successfully"
        }
        return response.Response(custom_data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        data = {
            'task': request.data.get('task'),
            'completed': request.data.get('completed'),
            'user': request.user.id
        }
        serializer = TodoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodoDetailApiView(views.APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwner]


    def get_object(self, todo_id, user_id):
        try:
            return Todo.objects.get(id=todo_id, user=user_id)
        except Todo.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, todo_id, *args, **kwargs):
        todo_instance =self.get_object(todo_id, request.user.id)
        if not todo_instance:
            return response.Response({'res': "Ce Todo List n'existe pas"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = TodoSerializer(instance=todo_instance)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    # 4. Update
    def put(self, request, todo_id, *args, **kwargs):
        todo_instance =self.get_object(todo_id, request.user.id)
        if not todo_instance:
            return response.Response({'res': "Ce Todo List n'existe pas"}, status=status.HTTP_400_BAD_REQUEST)

        data = {
            'task': request.data.get('task'),
            'completed': request.data.get('completed'),
            'user': request.user.id
        }
        serializer = TodoSerializer(instance=todo_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, todo_id, *args, **kwargs):
        todo_instance = self.get_object(todo_id, request.user.id)
        if not todo_instance:
            return response.Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        todo_instance.delete()
        return response.Response({'res': "Todo Delete"}, status=status.HTTP_200_OK)
