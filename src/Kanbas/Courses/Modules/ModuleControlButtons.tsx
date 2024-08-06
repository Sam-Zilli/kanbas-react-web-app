// Each modules controls (pencil, trash, checkmark, +, ...

import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="d-flex align-items-center">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-2 fs-5 cursor-pointer"
      />
      <FaTrash
        className="text-danger me-2 fs-5 cursor-pointer"
        onClick={() => deleteModule(moduleId)}
      />
      <GreenCheckmark className="me-2" />
      <BsPlus className="fs-1 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
