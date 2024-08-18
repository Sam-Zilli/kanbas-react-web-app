export interface Assignment {
  _id: string;
  name: string;
  description: string;
  points: number;
  dueDate: string;
  course: string;
  group: string;
  displayGradeAs: string;
  submissionTypes: string[];
  assignTo: string;
  availableFrom: string;
  availableUntil: string;
  editing?: boolean;
}


export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string; 
  email: string;
  role: 'USER' | 'ADMIN' | 'FACULTY' | 'STUDENT';
}


export interface Question {
  _id: string;                  // Unique identifier for the question
  text: string;                 // The text of the question
  points: number;               // Points assigned to this question
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay'; // Type of question
  choices?: string[];           // Choices for multiple-choice questions
  correctAnswer: string | string[]; // Correct answer(s) for the question
  explanation?: string;         // Optional explanation for the correct answer
}
