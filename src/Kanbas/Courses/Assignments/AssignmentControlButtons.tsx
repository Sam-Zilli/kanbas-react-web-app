// import { IoEllipsisVertical } from "react-icons/io5";
// import GreenCheckmark from "../Modules/GreenCheckmark";
// import { BsPlus } from "react-icons/bs";
// import { FaPencil } from "react-icons/fa6";

import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import ConfirmationDialog from "./ConfirmationDialog";

export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment,
}: // editAssignment,
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
      {/* <GreenCheckmark className="me-2" />
      <BsPlus className="fs-1 me-2" />
      <IoEllipsisVertical className="fs-4" /> */}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
