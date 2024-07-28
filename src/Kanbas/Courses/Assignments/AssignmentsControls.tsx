import AssignmentsEditor from "./AssignmentsEditor";
import { FaPlus } from "react-icons/fa6";


export default function AssignmentsControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}) {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button
        className="btn btn-lg btn-danger me-1 float-end"
        data-bs-toggle="modal"
        data-bs-target="#wd-add-module-dialog"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </button>

      <AssignmentsEditor
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
