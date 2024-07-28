export interface Assignment {
    _id: string;
    name: string;
    description: string;
    points: number;
    group: string;
    displayGradeAs?: string;
    submissionTypes?: string[];
    assignTo?: string;
    dueDate: string;
    availableFrom?: string;
    availableUntil?: string;
    course: string;
    editing?: boolean,
  }