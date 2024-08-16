// src/Kanbas/Quizzes/QuizEditor.tsx

import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as client from "./client";

export default function QuizEditor() {
  const { cid } = useParams();
  const [quizName, setQuizName] = useState("");

  const handleSave = () => {
    // Handle saving the new quiz
  };

  return (
    <div>
      <h2>Create New Quiz for Course {cid}</h2>
      <input
        type="text"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        placeholder="Quiz Name"
      />
      <button onClick={handleSave}>Save Quiz</button>
    </div>
  );
}

