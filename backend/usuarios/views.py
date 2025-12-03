from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Usuario
from .serializers import UsuarioSerializer, RegisterSerializer, LoginSerializer


# ============================
# REGISTRO DE USUARIO
# ============================

class RegistroView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            {
                "message": "Usuario registrado correctamente",
                "user": UsuarioSerializer(user).data
            },
            status=status.HTTP_201_CREATED
        )


# ============================
# LOGIN CON JWT
# ============================

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "message": "Datos inválidos",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Login exitoso",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UsuarioSerializer(user).data
            },
            status=status.HTTP_200_OK
        )


# ============================
# PERFIL DEL USUARIO (PROTEGIDO)
# ============================

class PerfilView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UsuarioSerializer(user)

        return Response(
            {
                "message": "Perfil del usuario",
                "user": serializer.data
            },
            status=status.HTTP_200_OK
        )
