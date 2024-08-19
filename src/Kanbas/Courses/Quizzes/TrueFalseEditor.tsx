import React from 'react';
import { TrueFalseQuestion } from "../../types";

type TrueFalseQuestionEditorProps = {
  question: TrueFalseQuestion;
  onQuestionChange: (field: keyof TrueFalseQuestion, value: any) => void;
};

const TrueFalseQuestionEditor: React.FC<TrueFalseQuestionEditorProps> = ({
  question,
  onQuestionChange,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">Correct Answer</label>
      <select
        className="form-select"
        value={question.correctAnswer}
        onChange={(e) => onQuestionChange('correctAnswer', e.target.value)}
      >
        <option value="True">True</option>
        <option value="False">False</option>
      </select>
    </div>
  );
};

export default TrueFalseQuestionEditor;

