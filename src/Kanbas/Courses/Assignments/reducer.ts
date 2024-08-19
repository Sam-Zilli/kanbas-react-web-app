import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Assignment } from "../../types";

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, action: PayloadAction<Omit<Assignment, '_id'>>) => {

      const newAssignment: Assignment = {
        _id: new Date().getTime().toString(),
        name: action.payload.name || "Untitled", 
        description: action.payload.description || "No description provided", 
        points: action.payload.points || 0, 
        dueDate: action.payload.dueDate || "", 
        course: action.payload.course || "", 
        group: action.payload.group || "",
        displayGradeAs: action.payload.displayGradeAs || "", 
        submissionTypes: action.payload.submissionTypes || [], 
        assignTo: action.payload.assignTo || "", 
        availableFrom: action.payload.availableFrom || "", 
        availableUntil: action.payload.availableUntil || "", 
        editing: action.payload.editing ?? false, 
      };



      state.assignments = [...state.assignments, newAssignment];


    },

    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== action.payload);
    },

    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },

    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;