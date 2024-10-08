import { useState, useEffect } from "react";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import * as client from "./client";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  setModules,
  addModule,
  editModule,
  updateModule,
  deleteModule,
} from "./reducer";
import { PiDotsSixVerticalFill } from "react-icons/pi";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const modules = useSelector((state: any) => state.modulesReducer.modules);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer); 

  const createModule = async (module: any) => {
    const newModule = await client.createModule(cid as string, module);
    dispatch(addModule(newModule));
  };

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const saveModule = async (module: any) => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const removeModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  return (
    <div id="wd-modules" className="container mt-4">
      {/* Conditional rendering based on user role */}
      {currentUser?.role === "FACULTY" && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <ModulesControls
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={() => {
              createModule({ name: moduleName, course: cid });
              setModuleName("");
            }}
          />
        </div>
      )}

      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h3 id="wd-modules-title" className="mb-0">
            Modules
          </h3>
        </div>
      </div>

      <ul id="wd-modules-list" className="list-group">
        {modules.map((module: any) => (
          <li
            key={module._id}
            className="wd-modules-list-item list-group-item p-3 mb-3 border border-secondary rounded-3 bg-white d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center flex-grow-1 text-black">
              <PiDotsSixVerticalFill className="me-3 fs-4 text-black" />
              {!module.editing && module.name}

              {module.editing && (
                <input
                  className="form-control w-50 d-inline-block"
                  value={module.name}
                  onChange={(e) =>
                    saveModule({ ...module, name: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                />
              )}

              {/* Each module's controls (pencil, trash, checkmark, +, ....) */}
              <div className="ms-auto">
                {currentUser?.role === "FACULTY" && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={() => removeModule(module._id)}
                    editModule={() => dispatch(editModule(module._id))}
                  />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
