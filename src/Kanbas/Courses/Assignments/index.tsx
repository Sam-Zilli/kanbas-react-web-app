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

import "./index.css";

export default function Assignments() {
  const { mid } = useParams<{ mid?: string }>(); 
  const moduleId = mid || "";

  const [assignmentName, setAssignmentName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>("");

  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    try {
      const assignments = await client.findAssignmentsForModule(moduleId); 
      dispatch(setAssignments(assignments));
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  };

  useEffect(() => {
    if (moduleId) {
      fetchAssignments();
    }
  }, [moduleId]);

  const handleAddAssignment = async () => {
    try {
      const newAssignment = {
        name: assignmentName,
        description,
        points,
        dueDate,
        moduleId,
        group: "",
        displayGradeAs: "",
        submissionTypes: [],
        assignTo: "",
        availableFrom: "",
        availableUntil: "",
      };

      const createdAssignment = await client.createAssignment(moduleId, newAssignment);
      dispatch(addAssignment(createdAssignment));
      // Reset fields
      setAssignmentName("");
      setDescription("");
      setPoints(0);
      setDueDate("");
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

      {/* The Header thing that says Assignments */}
      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h3 id="wd-assignments-title" className="mb-0">
            Assignments
          </h3>
          <div className="ms-auto d-flex align-items-center">
            <div className="pill bg-secondary text-white px-3 py-1 rounded-pill me-3">
              40% of Total
            </div>
            <button className="btn btn-outline-secondary">+</button>
          </div>
        </div>
      </div>

      {/* List of assignments */}
      <ul id="wd-assignments-list" className="list-group">
        {assignments
          .filter((assignment: any) => assignment.moduleId === moduleId)
          .map((assignment: any) => (
            <li
              key={assignment._id}
              className="wd-assignments-list-item list-group-item p-3 mb-3 border border-secondary rounded-3 bg-white d-flex flex-column"
            >
              <div className="d-flex align-items-start text-black">
                <div className="d-flex flex-column flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <PiDotsSixVerticalFill className="me-3 fs-4 text-black" />
                    <Link
                      to={`/Kanbas/Courses/${moduleId}/Assignments/${assignment._id}`}
                      className="wd-assignment-link text-dark text-decoration-none d-block mb-2"
                    >
                      {assignment.name}
                    </Link>
                  </div>

                  {/* Assignment Details */}
                  <div id="assignment-details" className="text-muted mb-2">
                    <span className="text-danger">
                      {assignment.group || "Multiple Modules"}
                    </span>{" "}
                    | <strong>Points:</strong> {assignment.points || "N/A"} |{" "}
                    <strong>Not available until</strong>{" "}
                    {assignment.dueDate
                      ? new Date(assignment.dueDate).toLocaleString()
                      : "N/A"}{" "}
                    |
                    <br />
                    <strong>Due</strong>{" "}
                    {assignment.dueDate
                      ? new Date(assignment.dueDate).toLocaleString()
                      : "N/A"}
                  </div>
                </div>

                {/* Each assignment's control buttons */}
                <div className="ms-3 d-flex align-items-start">
                  <AssignmentControlButtons
                    assignmentId={assignment._id}
                    deleteAssignment={() =>
                      deleteAssignment(assignment._id)
                    }
                    editAssignment={() =>
                      dispatch(editAssignment(assignment._id))
                    }
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
