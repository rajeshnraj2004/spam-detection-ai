from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.spam_route import router as spam_router
from routes.auth_routes import router as auth_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Spam Routes
app.include_router(
    spam_router,
    prefix="/api/spam",
    tags=["Spam Detection"]
)

# Auth Routes
app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)

@app.get("/")
def home():

    return {
        "success": True,
        "message": "Backend Running"
    }