// src/Kanbas/Courses/Quizzes/QuizDetailsEditor.tsx
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type QuizDetailsEditorProps = {
  quizData: any;
  onChange: (field: string, value: any) => void;
};

const EditorModules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2' }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link']
  ]
};

const QuizDetailsEditor: React.FC<QuizDetailsEditorProps> = ({ quizData, onChange }) => {

  const [showAttempts, setShowAttempts] = useState(quizData.multipleAttempts);

  // Update state if quizData.multipleAttempts changes from outside
  useEffect(() => {
    setShowAttempts(quizData.multipleAttempts);
  }, [quizData.multipleAttempts]);




  return (
    <div className="details p-4 border">
      <h2>Quiz Details Editor</h2>
      
      {/* Name */}
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          value={quizData.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <ReactQuill
          value={quizData.description}
          onChange={(value) => onChange('description', value)}
          modules={EditorModules}
        />
      </div>

      {/* Points */}
      {/* <div className="mb-3">
        <label className="form-label">Points (Total From Questions)</label>
        <input
          type="number"
          className="form-control"
          value={quizData.points}
          onChange={(e) => onChange('points', parseInt(e.target.value, 10))}
          readOnly // Points will be calculated based on questions
        />
      </div> */}

      {/* Due Date */}
      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          className="form-control"
          value={quizData.dueDate.split('T')[0]} // Format date string for input
          onChange={(e) => onChange('dueDate', e.target.value)}
        />
      </div>

      {/* Available Date */}
      <div className="mb-3">
        <label className="form-label">Available Date</label>
        <input
          type="date"
          className="form-control"
          value={quizData.availableDate.split('T')[0]} // Format date string for input
          onChange={(e) => onChange('availableDate', e.target.value)}
        />
      </div>

      {/* Until Date */}
      <div className="mb-3">
        <label className="form-label">Until Date</label>
        <input
          type="date"
          className="form-control"
          value={quizData.untilDate.split('T')[0]} // Format date string for input
          onChange={(e) => onChange('untilDate', e.target.value)}
        />
      </div>

      {/* Number of Questions */}
      {/* <div className="mb-3">
        <label className="form-label">Number of Questions</label>
        <input
          type="number"
          className="form-control"
          value={quizData.numberOfQuestions}
          onChange={(e) => onChange('numberOfQuestions', parseInt(e.target.value, 10))}
        />
      </div> */}

      {/* Student Score */}
      {/* <div className="mb-3">
        <label className="form-label">Student Score</label>
        <input
          type="number"
          className="form-control"
          value={quizData.studentScore}
          onChange={(e) => onChange('studentScore', parseInt(e.target.value, 10))}
        />
      </div> */}

      {/* Type */}
      <div className="mb-3">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          value={quizData.type}
          onChange={(e) => onChange('type', e.target.value)}
        >
          <option value="Graded Quiz">Graded Quiz</option>
          <option value="Practice Quiz">Practice Quiz</option>
          <option value="Graded Survey">Graded Survey</option>
          <option value="Ungraded Survey">Ungraded Survey</option>
        </select>
      </div>

      {/* Assignment Group */}
      <div className="mb-3">
        <label className="form-label">Assignment Group</label>
        <input
          type="text"
          className="form-control"
          value={quizData.assignmentGroup}
          onChange={(e) => onChange('assignmentGroup', e.target.value)}
        />
      </div>

      {/* Shuffle Answers */}
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={quizData.shuffleAnswers}
          onChange={(e) => onChange('shuffleAnswers', e.target.checked)}
        />
        <label className="form-check-label">Shuffle Answers</label>
      </div>

      {/* Time Limit */}
      <div className="mb-3">
        <label className="form-label">Time Limit (minutes)</label>
        <input
          type="number"
          className="form-control"
          value={quizData.timeLimit}
          onChange={(e) => onChange('timeLimit', parseInt(e.target.value, 10))}
        />
      </div>

     {/* Multiple Attempts */}
     <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={quizData.multipleAttempts}
          onChange={(e) => {
            onChange('multipleAttempts', e.target.checked);
            setShowAttempts(e.target.checked);
          }}
        />
        <label className="form-check-label">Multiple Attempts</label>
      </div>

      {/* Attempts */}
      {showAttempts && (
        <div className="mb-3">
          <label className="form-label">Attempts</label>
          <input
            type="number"
            className="form-control"
            value={quizData.attempts}
            onChange={(e) => onChange('attempts', parseInt(e.target.value, 10))}
          />
        </div>
      )}


      {/* Show Correct Answers */}
      <div className="mb-3">
        <label className="form-label">Show Correct Answers</label>
        <select
          className="form-select"
          value={quizData.showCorrectAnswers}
          onChange={(e) => onChange('showCorrectAnswers', e.target.value)}
        >
          <option value="Never">Never</option>
          <option value="After Due Date">After Due Date</option>
          <option value="Always">Always</option>
        </select>
      </div>

      {/* Access Code */}
      <div className="mb-3">
        <label className="form-label">Access Code</label>
        <input
          type="text"
          className="form-control"
          value={quizData.accessCode}
          onChange={(e) => onChange('accessCode', e.target.value)}
        />
      </div>

      {/* One Question at a Time */}
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={quizData.oneQuestionAtATime}
          onChange={(e) => onChange('oneQuestionAtATime', e.target.checked)}
        />
        <label className="form-check-label">One Question at a Time</label>
      </div>

      {/* Webcam Required */}
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={quizData.webcamRequired}
          onChange={(e) => onChange('webcamRequired', e.target.checked)}
        />
        <label className="form-check-label">Webcam Required</label>
      </div>

      {/* Lock Questions After Answering */}
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={quizData.lockQuestionsAfterAnswering}
          onChange={(e) => onChange('lockQuestionsAfterAnswering', e.target.checked)}
        />
        <label className="form-check-label">Lock Questions After Answering</label>
      </div>
    </div>
  );
};

export default QuizDetailsEditor;
