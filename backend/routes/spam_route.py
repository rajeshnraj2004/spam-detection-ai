from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from controllers.spam_controller import (
    check_spam,
    clear_history,
    delete_history_item,
    get_history,
    get_stats,
)

router = APIRouter()


class MessageRequest(BaseModel):
    text: str


@router.post("/predict")
def predict(data: MessageRequest):
    try:
        return check_spam(data.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/history")
def history():
    try:
        return get_history()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats")
def stats():
    try:
        return get_stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/history/{message_id}")
def delete_history(message_id: str):
    try:
        if delete_history_item(message_id):
            return {"success": True, "message": "Activity removed"}
        raise HTTPException(status_code=404, detail="Activity not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/history")
def delete_all_history():
    try:
        if clear_history():
            return {"success": True, "message": "All activity cleared"}
        raise HTTPException(status_code=500, detail="Failed to clear activity")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
