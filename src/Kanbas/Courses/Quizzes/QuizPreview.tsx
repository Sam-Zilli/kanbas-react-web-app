import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    // Fetch quiz data logic
  }, [cid, qid]);

  const handleEdit = () => {
    // Navigate to quiz editor
  };

  return (
    <div className="quiz-preview">
      <h2>Quiz Preview</h2>

      <button onClick={handleEdit}>Edit Quiz</button>
    </div>
  );
}
