from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get values from .env
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

try:

    # Connect MongoDB
    client = MongoClient(MONGO_URI)

    # Check connection
    client.admin.command("ping")

    print("✅ MongoDB Connected Successfully")

    # Database
    db = client[DB_NAME]

    # Collection
    collection = db[COLLECTION_NAME]

except Exception as e:

    print("❌ MongoDB Connection Failed")
    print(e)