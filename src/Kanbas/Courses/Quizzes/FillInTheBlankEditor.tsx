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

