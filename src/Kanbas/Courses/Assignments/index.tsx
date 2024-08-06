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
  updateAssignment,
  deleteAssignment,
} from "./reducer";
import { RootState } from "../../store";
import "./index.css";
import { Assignment } from "../../types";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  // State for assignment editing
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
  const saveAssignment = async (assignment: Assignment) => {
    console.log("Saving assignment:", assignment);
    try {
      const updatedAssignment = await client.updateAssignment(assignment);
      dispatch(updateAssignment(updatedAssignment));
      console.log("Assignment saved and updated in store:", updatedAssignment);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
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

      const createdAssignment = await client.createAssignment(newAssignment);

      console.log("API response (createdAssignment):", createdAssignment);

      dispatch(addAssignment(createdAssignment));
      console.log("Dispatched addAssignment with:", createdAssignment);

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
          .filter((assignment) => assignment.course === cid)
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
                      to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
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
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
