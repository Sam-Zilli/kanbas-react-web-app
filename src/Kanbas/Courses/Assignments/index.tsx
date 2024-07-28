import { useState } from "react";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, editAssignment, updateAssignment, deleteAssignment } from "./reducer";
import { useParams } from "react-router-dom";
import { PiDotsSixVerticalFill } from "react-icons/pi";

import "./index.css";

export default function Assignments() {
  const { cid } = useParams();
  
  // State variables for assignment details
  const [assignmentName, setAssignmentName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [dueDate, setDueDate] = useState("");

  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const dispatch = useDispatch();

  console.log("-------------------------");
  console.log("All Assignments:", assignments);

  // Handler for adding an assignment
  const handleAddAssignment = () => {
    dispatch(addAssignment({ 
      name: assignmentName, 
      description, 
      points, 
      dueDate, 
      course: cid 
    }));
    // Reset fields
    setAssignmentName("");
    setDescription("");
    setPoints(0);
    setDueDate("");
  };

  return (
    <div id="wd-assignments" className="container mt-4">
      <AssignmentsControls
        assignmentName={assignmentName}
        setAssignmentName={setAssignmentName}
        description={description}
        setDescription={setDescription}
        points={points}
        setPoints={setPoints}
        dueDate={dueDate}
        setDueDate={setDueDate}
        addAssignment={handleAddAssignment}
      />

      {/* The Header thing that says Assignments */}
      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h3 id="wd-assignments-title" className="mb-0">
            Assignments
          </h3>
        </div>
      </div>

      {/* List of assignments */}
      <ul id="wd-assignments-list" className="list-group">
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <li
              key={assignment._id}
              className="wd-assignments-list-item list-group-item p-3 mb-3 border border-secondary rounded-3 bg-white d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center flex-grow-1 text-black">
                <PiDotsSixVerticalFill className="me-3 fs-4 text-black" />
                {!assignment.editing && assignment.name}
                {assignment.editing && (
                  <input
                    className="form-control w-50 d-inline-block text-dark assignments-name-text d-block mb-2"
                    onChange={(e) =>
                      dispatch(
                        updateAssignment({ ...assignment, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateAssignment({ ...assignment, editing: false }));
                      }
                    }}
                    value={assignment.name}
                  />
                )}

                {/* Each assignment's control buttons */}
                <div className="ms-auto">
                  <AssignmentControlButtons
                    assignmentId={assignment._id}
                    deleteAssignment={() => dispatch(deleteAssignment(assignment._id))}
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
