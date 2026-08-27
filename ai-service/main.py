import os
import json
import asyncio
from typing import AsyncGenerator
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Khoa Học Tâm Linh AI Engine",
    description="Python FastAPI Service chuyên luận giải Tử Vi, Kinh Dịch, Tarot và RAG Tri thức cổ thư.",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AIReadingRequest(BaseModel):
    service_type: str  # "iching", "tarot", "tu_vi", "numerology"
    question: str
    user_context: dict = {}

async def generate_mock_or_gemini_stream(prompt: str) -> AsyncGenerator[str, None]:
    api_key = os.getenv("GEMINI_API_KEY")
    
    # Nếu có API Key thực tế từ Google AI Studio
    if api_key:
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            response = client.models.generate_content_stream(
                model="gemini-2.0-flash",
                contents=prompt,
            )
            for chunk in response:
                if chunk.text:
                    yield f"data: {json.dumps({'text': chunk.text})}\n\n"
                    await asyncio.sleep(0.01)
            return
        except Exception as e:
            yield f"data: {json.dumps({'text': f'Lỗi kết nối Gemini API: {str(e)}'})}\n\n"
            return

    # Fallback Streaming Engine mô phỏng trí tuệ huyền học
    simulated_texts = [
        "🔮 **Luận Giải Huyền Học Số:**\n\n",
        "Dựa trên dữ liệu thiên bàn và quẻ tượng bạn vừa gieo:\n",
        "- **Về Năng Lượng & Vận Trình**: Quẻ của bạn báo hiệu một bước chuyển mình quan trọng. Mọi trắc trở trong thời gian qua chỉ là bước thử thách nội lực.\n",
        "- **Về Công Danh & Sự Nghiệp**: Cơ hội lớn sắp xuất hiện, hãy kiên trì và giữ vững tâm thế điềm tĩnh, không nên vội vã.\n",
        "- **Về Tình Duyên & Mối Quan Hệ**: Chân thành và lắng nghe là chìa khóa hóa giải mọi hiểu lầm.\n\n",
        "✨ *Lời khuyên*: 'Tùy duyên bất biến, thuận theo dòng chảy của vũ trụ để gặt hái thành tựu.'\n"
    ]
    for text in simulated_texts:
        for char in text:
            yield f"data: {json.dumps({'text': char})}\n\n"
            await asyncio.sleep(0.02)

@app.get("/")
def read_root():
    return {
        "service": "Khoa Học Tâm Linh AI Engine",
        "engine": "Python FastAPI + Gemini 2.0 Streaming",
        "status": "ready"
    }

@app.post("/api/ai/reading/stream")
async def stream_reading(req: AIReadingRequest):
    prompt = f"""
    Bạn là Đại Sư Huyền Học & Nhà Khoa Học Tâm Linh AI cao cấp.
    Người dùng yêu cầu luận giải dịch vụ: {req.service_type.upper()}.
    Câu hỏi của người dùng: {req.question}
    Thông tin ngữ cảnh: {json.dumps(req.user_context, ensure_ascii=False)}
    
    Hãy luận giải bằng phong thái uyên bác, khoa học, logic, kết hợp tri thức cổ thư với tư duy tích cực, không mê tín dị đoan.
    """
    return StreamingResponse(
        generate_mock_or_gemini_stream(prompt),
        media_type="text/event-stream"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
