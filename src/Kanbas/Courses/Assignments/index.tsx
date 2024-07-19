import GreenCheckmark from "../Modules/GreenCheckmark";
import { BsGripVertical } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useParams } from "react-router";
import * as db from "../../Database";
import { PiDotsSixVerticalFill } from "react-icons/pi";
import { LuNewspaper } from "react-icons/lu";
import "./index.css";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  const chosenAssignments = assignments.filter(assignment => assignment.course === cid);


  return (
    <div id="wd-assignments" className="container mt-4">
      {/* Search and Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="position-relative w-50">
          <input
            id="wd-search-assignment"
            className="form-control ps-5"
            placeholder="Search for Assignments"
          />
          <FaMagnifyingGlass className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
        </div>
        <div>
          <button id="wd-add-assignment-group" className="btn btn-success me-2">
            + Group
          </button>
          <button id="wd-add-assignment" className="btn btn-primary">
            + Assignment
          </button>
        </div>
      </div>

      {/* Card Header with Oval-shaped Pill thing */}
      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h3 id="wd-assignments-title" className="mb-0">
            ASSIGNMENTS
          </h3>
          <div className="pill bg-secondary text-white px-3 py-1 rounded-pill">
            40% of Total
          </div>
          <button className="btn btn-outline-secondary">+</button>
        </div>
      </div>

      {/* Assignment List */}
      <ul id="wd-assignment-list" className="list-group">
        {chosenAssignments.map((assignment) => (
          <li
            key={assignment._id}
            className="wd-assignment-list-item list-group-item p-3 mb-3 border border-secondary rounded-3 bg-white assignment-card"
          >
            <div className="d-flex align-items-center">
              <PiDotsSixVerticalFill className="me-3 fs-4 text-black" />
              <LuNewspaper className="me-3 fs-4 text-success" />
              <div className="d-flex flex-grow-1 align-items-center me-3">
                <BsGripVertical className="me-3 fs-4" />
                <div className="flex-grow-1">
                  <a
                    className="wd-assignment-link text-dark text-decoration-none d-block mb-2"
                    href={`#/Kanbas/Courses/1234/Assignments/${assignment._id}`}
                  >
                    {assignment.title}
                  </a>
                  <div className="text-muted">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    {/* <strong>Not available until</strong>{" "}
                    {assignment.availableOn} at {assignment.timeDue} | */}
                    <strong>Not available until</strong>{" "} 12/1/2024 at 00:00AM |
                    <br />
                    {/* <strong>Due</strong> {assignment.dueDate} at{" "}
                    {assignment.timeDue} | {assignment.points} pts */}
                    <strong>Due</strong> 12/2/2024 at 00:00AM
                  </div>
                </div>
              </div>
              {/* Adding margin to the GreenCheckmark */}
              <GreenCheckmark className="ms-3" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}