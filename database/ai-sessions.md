# Bảng Phiên Luận Giải AI (AI Reading Sessions)

## 📊 Schema Table `ai_reading_sessions`

```sql
CREATE TABLE ai_reading_sessions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    session_code VARCHAR(50) UNIQUE NOT NULL, -- 'AI-READ-XXXXXXXX'
    user_id BIGINT UNSIGNED NULL,             -- NULL nếu là khách vãng lai
    service_type ENUM('tarot', 'kinh_dich', 'tu_vi', 'than_so_hoc', 'ban_do_sao') NOT NULL,
    
    user_input_data JSON NOT NULL,            -- { "question": "...", "dob": "1995-10-15", "time": "08:30", "gender": "male" }
    reading_result JSON NOT NULL,              -- { "cards": [...], "hexagram": {...} }
    ai_interpretation MEDIUMTEXT NOT NULL,    -- Toàn bộ văn bản AI luận giải
    ai_model_used VARCHAR(50) DEFAULT 'gemini-1.5-pro',
    
    is_unlocked BOOLEAN DEFAULT FALSE,        -- ServiceGuard: mở khóa chi tiết hay chỉ tóm tắt
    rating TINYINT UNSIGNED NULL,             -- 1 đến 5 sao
    feedback TEXT NULL,                       -- Nhận xét người dùng
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_session_user_type (user_id, service_type, created_at),
    INDEX idx_session_type (service_type),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🤖 Vai Trò Trong Hệ Thống AI & RAG

- **Huấn Luyện & Lưu Vết (Context Retention)**: Khi người dùng hỏi tiếp các câu hỏi mở rộng, hệ thống sẽ lấy lịch sử từ `ai_reading_sessions` để duy trì ngữ cảnh trò chuyện (Conversational Memory).
- **ServiceGuard Integration**: Kết quả luận giải được lưu trữ đầy đủ trong DB; Frontend hiển thị bản tóm tắt (30%) cho khách chưa trả tiền và mở khóa 100% khi thanh toán thành công bằng Linh Tệ.
