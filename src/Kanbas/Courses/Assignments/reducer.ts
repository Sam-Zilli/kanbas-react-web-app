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

      // Create a new assignment with default values
      const newAssignment: Assignment = {
        _id: new Date().getTime().toString(), // TEMPORARY local ID
        name: action.payload.name || "Untitled", // Default to "Untitled" if not provided
        description: action.payload.description || "No description provided", // Default description
        points: action.payload.points || 0, // Default to 0 if not provided
        dueDate: action.payload.dueDate || "", // Default to an empty string if not provided
        course: action.payload.course || "", // Default to an empty string if not provided
        group: action.payload.group || "", // Default to an empty string if not provided
        displayGradeAs: action.payload.displayGradeAs || "", // Default to an empty string if not provided
        submissionTypes: action.payload.submissionTypes || [], // Default to an empty array if not provided
        assignTo: action.payload.assignTo || "", // Default to an empty string if not provided
        availableFrom: action.payload.availableFrom || "", // Default to an empty string if not provided
        availableUntil: action.payload.availableUntil || "", // Default to an empty string if not provided
        editing: action.payload.editing ?? false, // Default to false if not provided
      };


      // Add the new assignment to the state
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



// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Assignment } from "../../types";

// interface AssignmentsState {
//   assignments: Assignment[];
// }

// const initialState: AssignmentsState = {
//   assignments: [],
// };

// const assignmentsSlice = createSlice({
//   name: "assignments",
//   initialState,
//   reducers: {
//     setAssignments: (state, action: PayloadAction<Assignment[]>) => {
//       state.assignments = action.payload;
//     },

//     addAssignment: (state, action: PayloadAction<Omit<Assignment, '_id'>>) => {
//       // Create a new assignment with a unique _id
//       const newAssignment: Assignment = {
//         _id: new Date().getTime().toString(), 
//         ...action.payload, 
//       };
//       state.assignments.push(newAssignment);
//     },

//     deleteAssignment: (state, action: PayloadAction<string>) => {
//       state.assignments = state.assignments.filter((assignment) => assignment._id !== action.payload);
//     },

//     updateAssignment: (state, action: PayloadAction<Assignment>) => {
//       state.assignments = state.assignments.map((assignment) =>
//         assignment._id === action.payload._id ? action.payload : assignment
//       );
//     },

//     editAssignment: (state, action: PayloadAction<string>) => {
//       state.assignments = state.assignments.map((assignment) =>
//         assignment._id === action.payload ? { ...assignment, editing: true } : assignment
//       );
//     },
//   },
// });

// export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignments } = assignmentsSlice.actions;
// export default assignmentsSlice.reducer;
