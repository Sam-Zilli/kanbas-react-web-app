// src/Kanbas/Courses/Quizzes/QuizQuestionsEditor.tsx
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

type Question = {
  type: string;
  description: string;
  options: string[];
  correctAnswer: string;
  points: number;
};

type QuizQuestionsEditorProps = {
  questions: Question[];
  onQuestionChange: (index: number, field: keyof Question, value: any) => void;
  onQuestionRemove: (index: number) => void;
  onAddQuestion: () => void;
};

const EditorModules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2' }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link']
  ]
};

const QuizQuestionsEditor: React.FC<QuizQuestionsEditorProps> = ({
  questions,
  onQuestionChange,
  onQuestionRemove,
  onAddQuestion
}) => {
  return (
    <div className="questions p-4 border">
      <h2>Quiz Questions Editor</h2>
      <button className="btn btn-primary mb-3" onClick={onAddQuestion}>Add Question</button>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Type</label>
            <select
              className="form-select"
              value={question.type}
              onChange={(e) => onQuestionChange(index, 'type', e.target.value)}
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="true_false">True/False</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <ReactQuill
              value={question.description}
              onChange={(value) => onQuestionChange(index, 'description', value)}
              modules={EditorModules}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Options</label>
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...question.options];
                    updatedOptions[optIndex] = e.target.value;
                    onQuestionChange(index, 'options', updatedOptions);
                  }}
                />
              </div>
            ))}
            <button
              className="btn btn-secondary mt-2"
              onClick={() => onQuestionChange(index, 'options', [...question.options, ""])}
            >
              Add Option
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label">Correct Answer</label>
            <input
              type="text"
              className="form-control"
              value={question.correctAnswer}
              onChange={(e) => onQuestionChange(index, 'correctAnswer', e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Points</label>
            <input
              type="number"
              className="form-control"
              value={question.points}
              onChange={(e) => onQuestionChange(index, 'points', parseInt(e.target.value, 10))}
            />
          </div>
          <button className="btn btn-danger" onClick={() => onQuestionRemove(index)}>Remove Question</button>
        </div>
      ))}
    </div>
  );
};

export default QuizQuestionsEditor;
