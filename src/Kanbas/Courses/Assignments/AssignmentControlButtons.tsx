import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import ConfirmationDialog from "./ConfirmationDialog";

interface Props {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}

export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment,
}: Props) {
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
