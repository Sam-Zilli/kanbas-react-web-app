import AssignmentsAdder from "./AssignmentsAdder";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentsControls({
  assignmentName,
  setAssignmentName,
  addAssignment,
}: {
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  addAssignment: () => void;
}) {
  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      {/* Group Button */}
      <button id="wd-add-assignment-group" className="btn btn-lg btn-success me-2">
        + Group
      </button>

      {/* Add Assignment Button  */}
      <button
        className="btn btn-lg btn-danger me-1 float-end"
        data-bs-toggle="modal"
        data-bs-target="#wd-add-assignment-dialog"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </button>
      {/* The dialog box that opens when you click Add Assignment Button */}
      <AssignmentsAdder
        dialogTitle="Add Assignment"
        assignmentName={assignmentName}
        setAssignmentName={setAssignmentName}
        addAssignment={addAssignment}
      />

    </div>
  );
}
