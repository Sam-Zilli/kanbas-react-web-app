import ModuleEditor from "./ModuleEditor";
import { FaPlus } from "react-icons/fa6";
// import { FaCircle } from "react-icons/fa";
// import GreenCheckmark from "./GreenCheckmark";
import PublishDropdown from "./PublishDropdown";
import ViewProgressButton from "./ViewProgressButton";
import CollapseAllButton from "./CollapseAllButton";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
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

      <PublishDropdown />

      {/* Implement the View Progress and Collapse All buttons
          with IDs wd-view-progress and wd-collapse-all */}
      <ViewProgressButton />
      <CollapseAllButton />

      <ModuleEditor
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
