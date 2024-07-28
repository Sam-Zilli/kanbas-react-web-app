// src/Courses/Assignments/reducer.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../../Database"
import { Assignment } from "../../types";

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: assignments as Assignment[], 
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      const newAssignment: Assignment = {
        ...action.payload,
        _id: new Date().getTime().toString(), 
      };
      console.log(newAssignment.name)
      console.log(newAssignment.course)
      console.log(newAssignment.points)
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
    },
    editAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload
          ? { ...assignment, editing: true }
          : assignment
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;