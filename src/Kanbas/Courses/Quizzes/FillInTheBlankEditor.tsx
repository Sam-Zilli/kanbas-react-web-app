// src/Kanbas/Courses/Quizzes/FillInTheBlankEditor.tsx
import React from 'react';
import { FillInTheBlankQuestion } from "../../types";

type FillInTheBlankQuestionEditorProps = {
  question: FillInTheBlankQuestion;
  onQuestionChange: (field: keyof FillInTheBlankQuestion, value: any) => void;
};

const FillInTheBlankQuestionEditor: React.FC<FillInTheBlankQuestionEditorProps> = ({
  question,
  onQuestionChange,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">Correct Answer</label>
      <input
        type="text"
        className="form-control"
        value={question.correctAnswer}
        onChange={(e) => onQuestionChange('correctAnswer', e.target.value)}
      />
    </div>
  );
};

export default FillInTheBlankQuestionEditor;


// // src/Kanbas/Courses/Quizzes/FillInTheBlankEditor.tsx
// import React from 'react';
// import { FillInTheBlankQuestion } from '../../types';

// type FillInTheBlankEditorProps = {
//   index: number;
//   question: FillInTheBlankQuestion;
//   onQuestionChange: (field: keyof FillInTheBlankQuestion, value: any) => void;
// };

// const FillInTheBlankEditor: React.FC<FillInTheBlankEditorProps> = ({
//   index,
//   question,
//   onQuestionChange
// }) => {
//   return (
//     <div>
//       <div className="mb-3">
//         <label className="form-label">question</label>
//         <input
//           className="form-control"
//           type="text"
//           value={question.question}
//           onChange={(e) => onQuestionChange('question', e.target.value)}
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Blanks</label>
//         <input
//           className="form-control"
//           type="number"
//           value={question.blanks}
//           onChange={(e) => onQuestionChange('blanks', parseInt(e.target.value, 10))}
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Answers</label>
//         <input
//           className="form-control"
//           type="text"
//           value={question.answers.join(', ')}
//           onChange={(e) => onQuestionChange('answers', e.target.value.split(',').map(ans => ans.trim()))}
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Points</label>
//         <input
//           className="form-control"
//           type="number"
//           value={question.points}
//           onChange={(e) => onQuestionChange('points', parseInt(e.target.value, 10))}
//         />
//       </div>
//     </div>
//   );
// };

// export default FillInTheBlankEditor;
