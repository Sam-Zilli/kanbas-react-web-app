import { useState } from "react";
import { useParams } from "react-router-dom";

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);

  const handleAddQuestion = () => {

  };

  const handleSaveQuestions = () => {

  };

  const handleCancelClick = () => {
    // console.log("Cancelled")
    };

  return (
    <div className="quiz-questions-editor">
      <h2>Quiz Questions</h2>
      <button onClick={handleAddQuestion}>New Question</button>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {/* Render question editor component */}
          </li>
        ))}
      </ul>
      <button onClick={handleSaveQuestions}>Save</button>
      <button onClick={() => handleCancelClick}>Cancel</button>
    </div>
  );
}
