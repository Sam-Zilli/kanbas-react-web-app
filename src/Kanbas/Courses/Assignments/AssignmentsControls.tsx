import { FaPlus } from "react-icons/fa6";
import AssignmentAdder from "./AssignmentAdder";

type AssignmentsControlsProps = {
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  points: number;
  setPoints: (points: number) => void;
  dueDate: string;
  setDueDate: (dueDate: string) => void;
  addAssignment: () => void;
};

export default function AssignmentsControls({
  assignmentName,
  setAssignmentName,
  description,
  setDescription,
  points,
  setPoints,
  dueDate,
  setDueDate,
  addAssignment,
}: AssignmentsControlsProps) {
  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      {/* ADD ASSIGNMENT BUTTON */}
      <button
        className="btn btn-lg btn-danger me-1 float-end"
        data-bs-toggle="modal"
        data-bs-target="#wd-add-assignment-dialog"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </button>

      {/* Group Button */}
      <button id="wd-add-assignment-group" className="btn btn-lg btn-success me-1 float-end">
        + Group
      </button>

      <AssignmentAdder
        dialogTitle="Add Assignment"
        assignmentName={assignmentName}
        setAssignmentName={setAssignmentName}
        description={description}
        setDescription={setDescription}
        points={points}
        setPoints={setPoints}
        dueDate={dueDate}
        setDueDate={setDueDate}
        addAssignment={addAssignment}
      />
    </div>
  );
}