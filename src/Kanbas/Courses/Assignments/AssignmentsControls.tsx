import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import AssignmentAdder from "./AssignmentAdder";
import { useState } from "react";


export default function AssignmentsControls({
  assignmentName,
  setAssignmentName,
  addAssignment,
  description,
  setDescription,
  points,
  setPoints,
  dueDate,
  setDueDate,
}: {
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  addAssignment: () => void;
  description: string;
  setDescription: (description: string) => void;
  points: number;
  setPoints: (points: number) => void;
  dueDate: string;
  setDueDate: (dueDate: string) => void;

}) {

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      id="wd-assignments-controls"
      className="d-flex justify-content-between align-items-center mb-4"
    >
      {/* Search Bar */}
      <div className="d-flex align-items-center w-50">
        <div className="position-relative w-100">
          <input
            id="wd-search-assignment"
            className="form-control ps-5"
            placeholder="Search for Assignments"
            value={searchTerm}
            onChange={handleChange}
          />
          <FaMagnifyingGlass className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
        </div>
      </div>

      {/* Controls on the right side */}
      <div className="d-flex align-items-center">
        {/* Add Assignment Button */}
        <button
          className="btn btn-lg btn-danger me-2"
          data-bs-toggle="modal"
          data-bs-target="#wd-add-assignment-dialog"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </button>

        {/* Group Button */}
        <button
          id="wd-add-assignment-group"
          className="btn btn-lg btn-success me-2"
        >
          + Group
        </button>

        {/* Assignment Adder Component */}
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
    </div>
  );
}
