import React from 'react';
import { MultipleChoiceQuestion } from "../../types";

type MultipleChoiceQuestionEditorProps = {
  question: MultipleChoiceQuestion;
  onQuestionChange: (field: keyof MultipleChoiceQuestion | 'options', value: any) => void;
};

const MultipleChoiceQuestionEditor: React.FC<MultipleChoiceQuestionEditorProps> = ({ question, onQuestionChange }) => {
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