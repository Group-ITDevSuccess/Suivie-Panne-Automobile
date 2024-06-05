from rest_framework import status, response, decorators, permissions
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .models import CustomUser
from .serializers import UserSerializer


@decorators.api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@decorators.api_view(['POST'])
def login_user(request):
    print("DATA : ", request.data)
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = None
        if '@' in username:
            try:
                user = CustomUser.objects.get(email=username)
            except ObjectDoesNotExist:
                pass

        if not user:
            user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return response.Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return response.Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@decorators.api_view(['GET'])
def token_user(request):
    if request.method == 'GET':
        print(request.data)
        token = None
        try:
            token = Token.objects.all().first()
            return response.Response({'token': token.key}, status=status.HTTP_200_OK)
        except:
            return response.Response({'error': 'Invalid credentials', 'token': token}, status=status.HTTP_401_UNAUTHORIZED)


@decorators.api_view(['POST'])
@decorators.permission_classes([permissions.IsAuthenticated])
def logout_user(request):
    if request.method == 'POST':
        try:
            request.user.auth_token.delete()
            return response.Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return response.Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
