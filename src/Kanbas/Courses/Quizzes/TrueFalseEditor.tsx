// TrueFalseEditor.tsx
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import quill styles

type TrueFalseEditorProps = {
  question: {
    type: string;
    description: string;
    correctAnswer: string;
    points: number;
  };
  index: number;
  onChange: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
};

const EditorModules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2' }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link']
  ]
};

const TrueFalseEditor: React.FC<TrueFalseEditorProps> = ({ question, index, onChange, onRemove }) => {
  return (
    <div key={index} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          value={question.type}
          onChange={(e) => onChange(index, 'type', e.target.value)}
        >
          <option value="multiple_choice">Multiple Choice</option>
          <option value="true_false">True/False</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <ReactQuill
          value={question.description}
          onChange={(value) => onChange(index, 'description', value)}
          modules={EditorModules}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Correct Answer</label>
        <div className="form-check">
          <input
            type="radio"
            name={`correctAnswer-${index}`}
            className="form-check-input"
            checked={question.correctAnswer === 'true'}
            onChange={() => onChange(index, 'correctAnswer', 'true')}
          />
          <label className="form-check-label">True</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            name={`correctAnswer-${index}`}
            className="form-check-input"
            checked={question.correctAnswer === 'false'}
            onChange={() => onChange(index, 'correctAnswer', 'false')}
          />
          <label className="form-check-label">False</label>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Points</label>
        <input
          type="number"
          className="form-control"
          value={question.points}
          onChange={(e) => onChange(index, 'points', parseInt(e.target.value, 10))}
        />
      </div>
      <button className="btn btn-danger" onClick={() => onRemove(index)}>Remove Question</button>
    </div>
  );
};

export default TrueFalseEditor;
