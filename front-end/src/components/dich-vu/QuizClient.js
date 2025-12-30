// quizApi.js (hoặc trong Component React của cậu)
import axios from "axios";

// ĐỊA CHỈ API PYTHON
const BASE_URL = "http://127.0.0.1:5000/api";

// --- Hàm 1: Bắt đầu Bài Test ---
export const startQuiz = async (domain) => {
  try {
    const response = await axios.post(`${BASE_URL}/start_quiz`, {
      domain: domain,
    });
    return response.data; // Trả về session_id và câu hỏi đầu tiên
  } catch (error) {
    console.error("Error starting quiz:", error);
    return { error: error.message };
  }
};

// --- Hàm 2: Gửi Đáp án và Nhận Câu Hỏi Tiếp theo ---
export const submitAnswer = async (sessionId, questionId, answerIndex) => {
  try {
    const response = await axios.post(`${BASE_URL}/submit_answer`, {
      session_id: sessionId,
      question_id: questionId,
      answer_index: answerIndex, // Chỉ mục của đáp án được chọn (0, 1, 2...)
    });
    return response.data; // Trả về status (continue/finished) và câu hỏi mới
  } catch (error) {
    console.error("Error submitting answer:", error);
    return { error: error.message };
  }
};
