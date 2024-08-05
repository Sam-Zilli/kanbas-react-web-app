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
      // Create a new assignment with a unique _id
      const newAssignment: Assignment = {
        _id: new Date().getTime().toString(), 
        ...action.payload, // Payload should not include _id
      };
      state.assignments.push(newAssignment);
    },

    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((assignment) => assignment._id !== action.payload);
    },

    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
    },

    editAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload ? { ...assignment, editing: true } : assignment
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
