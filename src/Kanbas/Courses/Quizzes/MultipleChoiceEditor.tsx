import React from 'react';
import { MultipleChoiceQuestion } from "../../types";

type MultipleChoiceQuestionEditorProps = {
  question: MultipleChoiceQuestion;
  onQuestionChange: (field: keyof MultipleChoiceQuestion | 'options', value: any) => void;
};

const MultipleChoiceQuestionEditor: React.FC<MultipleChoiceQuestionEditorProps> = ({ question, onQuestionChange }) => {
  console.log("Rendering MultipleChoiceQuestionEditor with question:", question);
  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Options</label>
        {question.options.map((option, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              className="form-control"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...question.options];
                updatedOptions[index] = e.target.value;
                onQuestionChange('options', updatedOptions);
              }}
            />
          </div>
        ))}
        <button
          className="btn btn-secondary"
          onClick={() => onQuestionChange('options', [...question.options, ''])}
        >
          Add Option
        </button>
      </div>
      <div className="mb-3">
        <label className="form-label">Correct Answer</label>
        <select
          className="form-select"
          value={question.correctAnswer}
          onChange={(e) => onQuestionChange('correctAnswer', e.target.value)}
        >
          {question.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestionEditor;



// import React from 'react';

// type MultipleChoiceEditorProps = {
//   question: {
//     type: "multiple_choice";
//     question: string;
//     options?: string[];
//     correctAnswer: string;
//     points: number;
//   };
//   index: number;
//   onChange: (index: number, field: string, value: any) => void;
//   onRemove: (index: number) => void;
// };

// const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({ question, index, onChange, onRemove }) => {
//   const options = question.options || [];

//   const handleAddOption = () => {
//     onChange(index, 'options', [...options, ""]);
//   };

//   const handleOptionChange = (optIndex: number, value: string) => {
//     const updatedOptions = [...options];
//     updatedOptions[optIndex] = value;
//     onChange(index, 'options', updatedOptions);
//   };

//   return (
//     <div className="mb-3">
//       <div className="mb-3">
//         <label className="form-label">question</label>
//         <input
//           type="text"
//           className="form-control"
//           value={question.question}
//           onChange={(e) => onChange(index, 'question', e.target.value)}
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Options</label>
//         {options.map((option, optIndex) => (
//           <div key={optIndex} className="form-check">
//             <input
//               type="radio"
//               className="form-check-input"
//               name={`question-${index}`}
//               checked={question.correctAnswer === option}
//               onChange={() => onChange(index, 'correctAnswer', option)}
//             />
//             <input
//               type="text"
//               className="form-control"
//               value={option}
//               onChange={(e) => handleOptionChange(optIndex, e.target.value)}
//             />
//             <button className="btn btn-danger mt-1" onClick={() => {
//               const updatedOptions = options.filter((_, i) => i !== optIndex);
//               onChange(index, 'options', updatedOptions);
//             }}>
//               Remove Option
//             </button>
//           </div>
//         ))}
//         <button className="btn btn-secondary mt-2" onClick={handleAddOption}>
//           Add Option
//         </button>
//       </div>
//       <button className="btn btn-danger mt-2" onClick={() => onRemove(index)}>
//         Remove Question
//       </button>
//     </div>
//   );
// };

// export default MultipleChoiceEditor;
