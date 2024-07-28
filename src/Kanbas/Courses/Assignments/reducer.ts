import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      console.log("In reducer, add Assignment: ", assignment.name)
      console.log(assignment.course)
      // console.log("In reducer, add Assignment: ", assignment.description)
      // console.log("In reducer, add Assignment: ", assignment.points)
      // console.log("In reducer, add Assignment: ", assignment.group)
      // console.log("In reducer, add Assignment: ", assignment.dueDate)
      const newAssignment: any = {
        _id: new Date().getTime().toString(),
        name: assignment.name,
        description: assignment.description,
        points: assignment.points,
        group: assignment.group, 
        dueDate: assignment.dueDate,
        course: assignment.course
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter((m: any) => m._id !== assignmentId);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((m: any) =>
        m._id === assignment._id ? assignment : m
      ) as any;
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((m: any) =>
        m._id === assignmentId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;