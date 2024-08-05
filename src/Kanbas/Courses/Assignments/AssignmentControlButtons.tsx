import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import ConfirmationDialog from "./ConfirmationDialog";

export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment,
  editAssignment
}:
{
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
  editAssignment: (assignmentId: string) => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteAssignment(assignmentId);
    setIsDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="d-flex align-items-center">
      {/* <FaPencil
        onClick={() => editAssignment(assignmentId)}
        className="text-primary me-2 fs-5 cursor-pointer"
      /> */}
      <FaTrash
        className="text-danger me-2 fs-5 cursor-pointer"
        onClick={handleDeleteClick}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
