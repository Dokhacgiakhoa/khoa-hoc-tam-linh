# 🚀 HƯỚNG DẪN TRIỂN KHAI CLOUD ONLINE MIỄN PHÍ ($0) & SCALE-UP TRẢ PHÍ

> **Kiến trúc**: Next.js 15 (Frontend) + C# .NET 10 Web API (Core) + Python FastAPI (AI) + Managed PostgreSQL Cloud (Supabase / Neon).

---

## 🌟 BẢNG TỔNG QUAN NỀN TẢNG CLOUD

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ 🎨 FRONTEND     │       │ ⚡ CORE BACKEND  │       │ 🧠 AI ENGINE    │
│  Vercel (Free)  │ ───►  │  Render/Koyeb   │ ───►  │  Render/Koyeb   │
│  (Next.js 15)   │       │  (.NET 10 API)  │       │  (Python AI)    │
└─────────────────┘       └────────┬────────┘       └────────┬────────┘
                                   │                         │
                                   ▼                         ▼
                          ┌───────────────────────────────────────────┐
                          │ 🗄️ MANAGED DATABASE (PostgreSQL 16)      │
                          │   Supabase / Neon Cloud (Free Tier)       │
                          │   (Sổ cái ACID + pgvector AI Embeddings)  │
                          └───────────────────────────────────────────┘
```

---

## 🛠️ BƯỚC 1: TẠO DATABASE POSTGRESQL TRÊN SUPABASE (FREE 100%)

1. Truy cập [https://supabase.com](https://supabase.com) và đăng nhập bằng GitHub.
2. Bấm **"New Project"**, đặt tên: `khoa-hoc-tam-linh-db`, chọn Database Password.
3. Vào mục **Project Settings** $\rightarrow$ **Database** $\rightarrow$ Copy chuỗi **Connection String (URI / Transaction Pooler)**:
   ```text
   Host=aws-0-ap-southeast-1.pooler.supabase.com;Port=6543;Database=postgres;Username=postgres.your_id;Password=your_password;SSL Mode=Require;Trust Server Certificate=true;
   ```
4. Dán chuỗi kết nối này vào `core-backend/appsettings.json`.

---

## 🛠️ BƯỚC 2: DEPLOY CORE BACKEND .NET 10 (RENDER / KOYEB - FREE)

1. Đẩy mã nguồn lên GitHub repository: `https://github.com/Dokhacgiakhoa/khoa-hoc-tam-linh`.
2. Truy cập [https://render.com](https://render.com) $\rightarrow$ Bấm **"New Web Service"** $\rightarrow$ Chọn Repository GitHub của bạn.
3. Cấu hình:
   - **Root Directory**: `core-backend`
   - **Environment**: `.NET` (hoặc Dockerfile)
   - **Build Command**: `dotnet publish -c Release -o out`
   - **Start Command**: `dotnet out/KhoaHocTamLinh.Api.dll`
4. Thêm Environment Variable:
   - `ConnectionStrings__DefaultConnection`: *(Dán Connection String Supabase ở Bước 1)*
   - `Jwt__SecretKey`: `KhoaHocTamLinh_Super_Secret_Key_2026_Enterprise_Edition_32BytesMinimumLength!`
5. Bấm **Deploy Web Service** $\rightarrow$ Bạn nhận được link API online: `https://khoahoc-tamlinh-api.onrender.com`.

---

## 🛠️ BƯỚC 3: DEPLOY AI ENGINE PYTHON FASTAPI (RENDER - FREE)

1. Trên [https://render.com](https://render.com) $\rightarrow$ Bấm **"New Web Service"** thứ 2.
2. Cấu hình:
   - **Root Directory**: `ai-service`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Thêm Environment Variable:
   - `GEMINI_API_KEY`: *(Lấy miễn phí tại [https://aistudio.google.com/](https://aistudio.google.com/))*
4. Bấm **Deploy** $\rightarrow$ Bạn nhận được link AI Engine online: `https://khoahoc-tamlinh-ai.onrender.com`.

---

## 🛠️ BƯỚC 4: DEPLOY FRONTEND NEXT.JS 15 LÊN VERCEL (FREE 100%)

1. Truy cập [https://vercel.com](https://vercel.com) $\rightarrow$ Bấm **"Add New Project"** $\rightarrow$ Chọn Repository GitHub.
2. Cấu hình:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `front-end`
3. Thêm Environment Variable:
   - `NEXT_PUBLIC_CORE_API_URL`: `https://khoahoc-tamlinh-api.onrender.com`
   - `NEXT_PUBLIC_AI_API_URL`: `https://khoahoc-tamlinh-ai.onrender.com`
4. Bấm **"Deploy"** $\rightarrow$ Sau 1 phút, trang web chính thức chạy Online với tên miền miễn phí: `https://khoa-hoc-tam-linh.vercel.app` (kèm SSL HTTPS bảo mật xanh).

---

## 💎 LỘ TRÌNH SCALE-UP TRẢ PHÍ (ENTERPRISE AZURE UPGRADE)

Khi dự án có doanh thu hoặc cần mở rộng quy mô lớn:
1. **Database**: Chuyển Connection String sang **Azure Database for PostgreSQL (Flexible Server)**.
2. **Core Backend**: Chuyển sang **Azure App Service (.NET 10)**.
3. **AI Service**: Tích hợp **Google Cloud Vertex AI** hoặc **Azure OpenAI Service**.
*(Mã nguồn hoàn toàn giữ nguyên 100%, chỉ thay đổi biến môi trường)*.
