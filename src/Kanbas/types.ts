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

// =============================== QUIZZES ===========================

export interface Quiz {
  name: string;
  description?: string;
  course: string;
  points: number;
  dueDate?: string; // ISO 8601 date string
  availableDate?: string; // ISO 8601 date string
  untilDate?: string; // ISO 8601 date string
  numberOfQuestions: number;
  studentScore?: number;
  published: boolean;
  type: 'Graded Quiz' | 'Practice Quiz' | 'Graded Survey' | 'Ungraded Survey';
  assignmentGroup: 'Quizzes' | 'Exams' | 'Assignments' | 'Project';
  shuffleAnswers: boolean;
  timeLimit: number; // Time limit in minutes
  multipleAttempts: boolean;
  attempts: number; // Number of allowed attempts
  showCorrectAnswers: 'Never' | 'AfterSubmission' | 'AfterDueDate'; // When correct answers are shown
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  questions: Question[]; // Array of Question objects
}


export type QuizData = {
  name: string;
  description: string;
  course: string;
  points: number;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  numberOfQuestions: number;
  studentScore: number;
  published: boolean;
  type: string;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  attempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  questions: Question[];
};


// =============================== QUESITONS ===========================


export type Question = 
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillInTheBlankQuestion;

export type MultipleChoiceQuestion = {
  type: 'multiple_choice';
  question: string; 
  options: string[];
  correctAnswer: string;
  points: number;
};

export type TrueFalseQuestion = {
  type: 'true_false';
  question: string; 
  correctAnswer: 'True' | 'False';
  points: number;
};

export type FillInTheBlankQuestion = {
  type: 'fill_in_the_blank';
  question: string; 
  correctAnswer: string;
  points: number;
};
