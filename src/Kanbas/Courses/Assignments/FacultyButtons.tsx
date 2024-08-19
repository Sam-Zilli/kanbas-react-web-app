import AssignmentAdder from "./AssignmentAdder";
import { FaPlus } from "react-icons/fa6";

interface FacultyButtonsProps {
    assignmentName: string;
    setAssignmentName: (name: string) => void;
    description: string;
    setDescription: (description: string) => void;
    points: number;
    setPoints: (points: number) => void;
    dueDate: string;
    setDueDate: (dueDate: string) => void;
    addAssignment: () => void;
}

export default function FacultyButtons({
    assignmentName,
    setAssignmentName,
    description,
    setDescription,
    points,
    setPoints,
    dueDate,
    setDueDate,
    addAssignment
}: FacultyButtonsProps) {
    return (
        <div>
            <div className="d-flex align-items-center">
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

                <button
                    id="wd-add-assignment-group"
                    className="btn btn-lg btn-success me-2"
                >
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
        </div>
    );
}
