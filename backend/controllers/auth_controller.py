from database.database import db
import bcrypt
from jose import jwt
from datetime import datetime, timedelta
import hashlib

SECRET_KEY = "secret123"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60

users_collection = db["users"]


# Hash Password
def hash_password(password):
    # Pre-hash the password with SHA-256 to avoid bcrypt's 72-character limit
    password_hash = hashlib.sha256(password.encode()).hexdigest().encode()
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_hash, salt)
    return hashed.decode()


# Verify Password
def verify_password(plain_password, hashed_password):
    password_hash = hashlib.sha256(plain_password.encode()).hexdigest().encode()
    return bcrypt.checkpw(password_hash, hashed_password.encode())


# Generate JWT Token
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# Register User
def register_user(user):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:

        return {
            "success": False,
            "message": "User already exists"
        }

    hashed_password = hash_password(user.password)

    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    })

    return {
        "success": True,
        "message": "User registered successfully"
    }


# Login User
def login_user(user):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if not existing_user:

        return {
            "success": False,
            "message": "User not found"
        }

    valid_password = verify_password(
        user.password,
        existing_user["password"]
    )

    if not valid_password:

        return {
            "success": False,
            "message": "Invalid password"
        }

    token = create_access_token({
        "user_id": str(existing_user["_id"]),
        "email": existing_user["email"]
    })

    return {
        "success": True,
        "message": "Login successful",
        "token": token,
        "user": {
            "name": existing_user["name"],
            "email": existing_user["email"]
        }
    }