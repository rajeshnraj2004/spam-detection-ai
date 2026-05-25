from datetime import datetime, timezone

from bson import ObjectId
from bson.errors import InvalidId

from database.database import collection
from models.spam_model import predict_spam


def check_spam(text: str):
    is_spam = predict_spam(text)
    message = "This message looks like spam." if is_spam else "This message does not appear to be spam."
            
    # Save prediction to MongoDB
    try:
        collection.insert_one({
            "text": text,
            "is_spam": is_spam,
            "timestamp": datetime.now(timezone.utc)
        })
    except Exception as e:
        print(f"Error saving message to MongoDB: {e}")
        
    return {"spam": is_spam, "message": message}


def _serialize_timestamp(ts):
    if ts is None:
        return None
    if ts.tzinfo is None:
        ts = ts.replace(tzinfo=timezone.utc)
    return ts.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


def get_history():
    # Fetch last 10 messages from MongoDB
    try:
        messages = list(collection.find().sort("timestamp", -1).limit(10))
        for msg in messages:
            msg["_id"] = str(msg["_id"])
            if "timestamp" in msg:
                msg["timestamp"] = _serialize_timestamp(msg["timestamp"])
        return messages
    except Exception as e:
        print(f"Error fetching history: {e}")
        return []


def delete_history_item(message_id: str):
    try:
        result = collection.delete_one({"_id": ObjectId(message_id)})
        return result.deleted_count > 0
    except InvalidId:
        return False
    except Exception as e:
        print(f"Error deleting history item: {e}")
        return False


def clear_history():
    try:
        collection.delete_many({})
        return True
    except Exception as e:
        print(f"Error clearing history: {e}")
        return False


def get_stats():
    # Fetch aggregate stats from MongoDB
    try:
        total = collection.count_documents({})
        spam = collection.count_documents({"is_spam": True})
        safe = total - spam
        return {
            "total": total,
            "spam": spam,
            "safe": safe
        }
    except Exception as e:
        print(f"Error fetching stats: {e}")
        return {"total": 0, "spam": 0, "safe": 0}
