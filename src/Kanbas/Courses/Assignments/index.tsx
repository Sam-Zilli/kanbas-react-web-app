import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { PiDotsSixVerticalFill } from "react-icons/pi";
import * as client from "./client";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import {
  setAssignments,
  addAssignment,
  editAssignment,
  updateAssignment,
  deleteAssignment,
} from "./reducer";
import { RootState } from "../../store"; // Ensure you have a type for your root state
import "./index.css";
import { Assignment } from "../../types";


export default function Assignments() {
  const { cid } = useParams<{ cid: string }>(); // Ensure type for params
  const dispatch = useDispatch();

  // Use appropriate state types
  const [assignmentName, setAssignmentName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>("");

  // Use correct selector and state type
  const assignments = useSelector((state: RootState) => state.assignmentsReducer.assignments);

  // Async function to remove assignment
  const removeAssignment = async (assignmentId: string) => {
    try {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  // Fetch assignments based on Course Id
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const fetchedAssignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(fetchedAssignments));
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      }
    };

    fetchAssignments();
  }, [cid, dispatch]);

  // Save assignment
  const saveAssignment = async (assignment: any) => {
    const status = await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };


// Handle adding a new assignment
const handleAddAssignment = async () => {
  console.log("handleAddAssignment called");
  console.log("Current state:", {
    assignmentName,
    description,
    points,
    dueDate,
    cid
  });

  try {
    // Construct the new assignment object
    const newAssignment: Omit<Assignment, '_id'> = {
      name: assignmentName,
      description,
      points,
      dueDate,
      course: cid || "", 
      group: "",
      displayGradeAs: "",
      submissionTypes: [],
      assignTo: "",
      availableFrom: "",
      availableUntil: "",
    };

    console.log("New assignment object:", newAssignment);

    // Call the API to create the assignment
    const createdAssignment = await client.createAssignment(newAssignment);
    
    console.log("API response (createdAssignment):", createdAssignment);

    // Dispatch action to add the assignment to the Redux store
    dispatch(addAssignment(createdAssignment));
    console.log("Dispatched addAssignment with:", createdAssignment);

    // Reset fields
    setAssignmentName("");
    setDescription("");
    setPoints(0);
    setDueDate("");
    console.log("Fields reset");
  } catch (error) {
    console.error("Failed to add assignment:", error);
  }
};

  return (
    <div id="wd-assignments" className="container mt-4">
      <div className="me-4">
        <AssignmentsControls
          assignmentName={assignmentName}
          setAssignmentName={setAssignmentName}
          addAssignment={handleAddAssignment}
          description={description}
          setDescription={setDescription}
          points={points}
          setPoints={setPoints}
          dueDate={dueDate}
          setDueDate={setDueDate}
        />
      </div>

      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h3 id="wd-assignments-title" className="mb-0">Assignments</h3>
          <div className="ms-auto d-flex align-items-center">
            <div className="pill bg-secondary text-white px-3 py-1 rounded-pill me-3">40% of Total</div>
            <button className="btn btn-outline-secondary">+</button>
          </div>
        </div>
      </div>

      <ul id="wd-assignments-list" className="list-group">
        {assignments
          .filter((assignment) => assignment.course === cid) // Make sure filter logic is correct
          .map((assignment) => (
            <li
              key={assignment._id}
              className="wd-assignments-list-item list-group-item p-3 mb-3 border border-secondary rounded-3 bg-white d-flex flex-column"
            >
              <div className="d-flex align-items-start text-black">
                <div className="d-flex flex-column flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <PiDotsSixVerticalFill className="me-3 fs-4 text-black" />
                    <Link
                      to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} // Updated route
                      className="wd-assignment-link text-dark text-decoration-none d-block mb-2"
                    >
                      {assignment.name}
                    </Link>
                  </div>

                  <div id="assignment-details" className="text-muted mb-2">
                    <span className="text-danger">{assignment.group || "Multiple Modules"}</span>{" "}
                    | <strong>Points:</strong> {assignment.points || "N/A"} |{" "}
                    <strong>Not available until</strong> {assignment.dueDate ? new Date(assignment.dueDate).toLocaleString() : "N/A"} |<br />
                    <strong>Due</strong> {assignment.dueDate ? new Date(assignment.dueDate).toLocaleString() : "N/A"}
                  </div>
                </div>

                <div className="ms-3 d-flex align-items-start">
                  <AssignmentControlButtons
                    assignmentId={assignment._id}
                    deleteAssignment={() => removeAssignment(assignment._id)}
                    editAssignment={() => dispatch(editAssignment(assignment._id))}
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams, Link } from "react-router-dom";
// import { PiDotsSixVerticalFill } from "react-icons/pi";
// import * as client from "./client";

// import AssignmentsControls from "./AssignmentsControls";
// import AssignmentControlButtons from "./AssignmentControlButtons";
// import {
//   setAssignments,
//   addAssignment,
//   editAssignment,
//   updateAssignment,
//   deleteAssignment,
// } from "./reducer";

// import "./index.css";

// export default function Assignments() {

//   const removeAssignment = async (assignmentId: string) => {
//     await client.deleteAssignment(assignmentId);
//     dispatch(deleteAssignment(assignmentId));
//   };

//   const { cid } = useParams();

//   const [assignmentName, setAssignmentName] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [points, setPoints] = useState<number>(0);
//   const [dueDate, setDueDate] = useState<string>("");

//   const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
//   const dispatch = useDispatch();


//   const createAssignment = async (assignment: any) => {
//     const newAssignment= await client.createAssignment(cid as string, assignment);
//     dispatch(addAssignment(newAssignment));
//   };



//   const fetchAssignments = async () => {
//     try {
//       const assignments = await client.findAssignmentsForModule(cid as string); 
//       dispatch(setAssignments(assignments));
//     } catch (error) {
//       console.error("Failed to fetch assignments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   const saveAssignment = async (assignment: any) => {
//     const status = await client.updateAssignment(assignment);
//     dispatch(updateAssignment(assignment));
//   };





//   const handleAddAssignment = async () => {
//     try {
//       const newAssignment = {
//         name: assignmentName,
//         description,
//         points,
//         dueDate,
//         cid,
//         group: "",
//         displayGradeAs: "",
//         submissionTypes: [],
//         assignTo: "",
//         availableFrom: "",
//         availableUntil: "",
//       };

//       const createdAssignment = await client.createAssignment(moduleId, newAssignment);
//       dispatch(addAssignment(createdAssignment));
//       // Reset fields
//       setAssignmentName("");
//       setDescription("");
//       setPoints(0);
//       setDueDate("");
//     } catch (error) {
//       console.error("Failed to add assignment:", error);
//     }
//   };






//   return (
//     <div id="wd-assignments" className="container mt-4">
//       <div className="me-4">
//         <AssignmentsControls
//           assignmentName={assignmentName}
//           setAssignmentName={setAssignmentName}
//           addAssignment={handleAddAssignment}
//           description={description}
//           setDescription={setDescription}
//           points={points}
//           setPoints={setPoints}
//           dueDate={dueDate}
//           setDueDate={setDueDate}
//         />
//       </div>

//       {/* The Header thing that says Assignments */}
//       <div className="card mb-4">
//         <div className="card-body d-flex justify-content-between align-items-center">
//           <h3 id="wd-assignments-title" className="mb-0">
//             Assignments
//           </h3>
//           <div className="ms-auto d-flex align-items-center">
//             <div className="pill bg-secondary text-white px-3 py-1 rounded-pill me-3">
//               40% of Total
//             </div>
//             <button className="btn btn-outline-secondary">+</button>
//           </div>
//         </div>
//       </div>

//       {/* List of assignments */}
//       <ul id="wd-assignments-list" className="list-group">
//         {assignments
//           .filter((assignment: any) => assignment.courseId === cid)
//           .map((assignment: any) => (
//             <li
//               key={assignment._id}
//               className="wd-assignments-list-item list-group-item p-3 mb-3 border border-secondary rounded-3 bg-white d-flex flex-column"
//             >
//               <div className="d-flex align-items-start text-black">
//                 <div className="d-flex flex-column flex-grow-1">
//                   <div className="d-flex align-items-center mb-2">
//                     <PiDotsSixVerticalFill className="me-3 fs-4 text-black" />
//                     <Link
//                       to={`/Kanbas/Courses/${moduleId}/Assignments/${assignment._id}`}
//                       className="wd-assignment-link text-dark text-decoration-none d-block mb-2"
//                     >
//                       {assignment.name}
//                     </Link>
//                   </div>

//                   {/* Assignment Details */}
//                   <div id="assignment-details" className="text-muted mb-2">
//                     <span className="text-danger">
//                       {assignment.group || "Multiple Modules"}
//                     </span>{" "}
//                     | <strong>Points:</strong> {assignment.points || "N/A"} |{" "}
//                     <strong>Not available until</strong>{" "}
//                     {assignment.dueDate
//                       ? new Date(assignment.dueDate).toLocaleString()
//                       : "N/A"}{" "}
//                     |
//                     <br />
//                     <strong>Due</strong>{" "}
//                     {assignment.dueDate
//                       ? new Date(assignment.dueDate).toLocaleString()
//                       : "N/A"}
//                   </div>
//                 </div>

//                 {/* Each assignment's control buttons */}
//                 <div className="ms-3 d-flex align-items-start">
//                   <AssignmentControlButtons
//                     assignmentId={assignment._id}
//                     deleteAssignment={() =>
//                       deleteAssignment(assignment._id)
//                     }
//                     editAssignment={() =>
//                       dispatch(editAssignment(assignment._id))
//                     }
//                   />
//                 </div>
//               </div>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }
