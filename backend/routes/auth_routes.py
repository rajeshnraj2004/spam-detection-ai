from fastapi import APIRouter

from models.user_model import (
    RegisterUser,
    LoginUser
)

from controllers.auth_controller import (
    register_user,
    login_user
)

router = APIRouter()


# Register Route
@router.post("/register")

def register(data: RegisterUser):

    return register_user(data)


# Login Route
@router.post("/login")

def login(data: LoginUser):

    return login_user(data)