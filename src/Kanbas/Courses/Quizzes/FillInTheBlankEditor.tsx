export default function FillInTheBlankEditor () {
  return (
    <div>
      ??????
    </div>
  )
}

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
//         <label className="form-label">Description</label>
//         <input
//           className="form-control"
//           type="text"
//           value={question.description}
//           onChange={(e) => onQuestionChange('description', e.target.value)}
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
