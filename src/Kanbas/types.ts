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