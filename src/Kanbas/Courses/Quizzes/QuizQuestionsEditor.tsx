import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { Question, MultipleChoiceQuestion, TrueFalseQuestion, FillInTheBlankQuestion } from "../../types";
import MultipleChoiceQuestionEditor from './MultipleChoiceEditor';
import TrueFalseQuestionEditor from './TrueFalseEditor';
import FillInTheBlankQuestionEditor from './FillInTheBlankEditor';
import { Modal, Button } from 'react-bootstrap';

type QuizQuestionsEditorProps = {
  questions: Question[];
  onQuestionChange: (index: number, field: keyof Question | 'options', value: any) => void;
  onQuestionRemove: (index: number) => void;
  onAddQuestion: (newQuestion: Question) => void;
};

const EditorModules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2' }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link']
  ]
};


const isMultipleChoiceQuestion = (question: Question): question is MultipleChoiceQuestion =>
  question.type === 'multiple_choice';

const isTrueFalseQuestion = (question: Question): question is TrueFalseQuestion =>
  question.type === 'true_false';

const isFillInTheBlankQuestion = (question: Question): question is FillInTheBlankQuestion =>
  question.type === 'fill_in_the_blank';

const QuizQuestionsEditor: React.FC<QuizQuestionsEditorProps> = ({
  questions,
  onQuestionChange,
  onQuestionRemove,
  onAddQuestion
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Question>({
    type: 'multiple_choice', 
    question: '',
    options: [],
    correctAnswer: '',
    points: 0
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddQuestion = () => {
    onAddQuestion(newQuestion);
    handleClose();
  };

  return (
    <div className="questions p-4 border">
      <h2>Quiz Questions Editor</h2>
      <Button className="btn btn-primary mb-3" onClick={handleShow}>Add Question</Button>
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
              <option value="fill_in_the_blank">Fill in the Blank</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Question</label>
            <ReactQuill
              value={question.question}
              onChange={(value) => onQuestionChange(index, 'question', value)}
              modules={EditorModules}
            />
          </div>
          {isMultipleChoiceQuestion(question) && (
            <MultipleChoiceQuestionEditor
              question={question}
              onQuestionChange={(field, value) => onQuestionChange(index, field, value)}
            />
          )}
          {isTrueFalseQuestion(question) && (
            <TrueFalseQuestionEditor
              question={question}
              onQuestionChange={(field, value) => onQuestionChange(index, field, value)}
            />
          )}
          {isFillInTheBlankQuestion(question) && (
            <FillInTheBlankQuestionEditor
              question={question}
              onQuestionChange={(field, value) => onQuestionChange(index, field, value)}
            />
          )}
          <div className="mb-3">
            <label className="form-label">Points</label>
            <input
              type="number"
              className="form-control"
              value={question.points}
              onChange={(e) => onQuestionChange(index, 'points', parseInt(e.target.value, 10))}
            />
          </div>
          <Button className="btn btn-danger" onClick={() => onQuestionRemove(index)}>Remove Question</Button>
        </div>
      ))}

      {/* Modal for adding new questions */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Type</label>
            <select
              className="form-select"
              value={newQuestion.type}
              onChange={(e) => {
                const type = e.target.value as 'multiple_choice' | 'true_false' | 'fill_in_the_blank';
                setNewQuestion(prev => {
                  switch(type) {
                    case 'multiple_choice':
                      return { ...prev, type, options: [], correctAnswer: '' };
                    case 'true_false':
                      return { ...prev, type, correctAnswer: 'True' }; 
                    case 'fill_in_the_blank':
                      return { ...prev, type, correctAnswer: '' };
                    default:
                      return prev;
                  }
                });
              }}
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="true_false">True/False</option>
              <option value="fill_in_the_blank">Fill in the Blank</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Question</label>
            <ReactQuill
              value={newQuestion.question}
              onChange={(value) => setNewQuestion(prev => ({ ...prev, question: value }))}
              modules={EditorModules}
            />
          </div>
          {newQuestion.type === 'multiple_choice' && (
            <MultipleChoiceQuestionEditor
              question={newQuestion as MultipleChoiceQuestion}
              onQuestionChange={(field, value) => setNewQuestion(prev => ({ ...prev, [field]: value }))}
            />
          )}
          {/* Implement editors for other types if needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleAddQuestion}>Add Question</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuizQuestionsEditor;