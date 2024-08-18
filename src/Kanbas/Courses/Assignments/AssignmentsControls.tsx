import { useState } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6";
import FacultyButtons from "./FacultyButtons";
import { FaCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

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
  const { currentUser } = useSelector((state: any) => state.accountReducer);
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
        {/* Conditionally render FacultyButtons based on userRole */}
        {currentUser.role === 'FACULTY' && (
          <FacultyButtons
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
        )}
      </div>

    </div>
  );
}
