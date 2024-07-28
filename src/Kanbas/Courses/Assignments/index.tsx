import GreenCheckmark from "../Modules/GreenCheckmark";
import { BsGripVertical } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import * as db from "../../Database";
import { PiDotsSixVerticalFill } from "react-icons/pi";
import { LuNewspaper } from "react-icons/lu";
import "./index.css";
import { useState } from "react";
import { addAssignment, editAssignment, updateAssignment, deleteAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Assignments() {
  const { cid } = useParams();
  const [assignmentName, setAssignmentName] = useState("");
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const dispatch = useDispatch();

  return (
    <div id="wd-assignments" className="container mt-4">
      {/* Making all the buttons be in one row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Search */}
        <div className="position-relative w-50">
          <input
            id="wd-search-assignment"
            className="form-control ps-5"
            placeholder="Search for Assignments"
          />
          <FaMagnifyingGlass className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
        </div>

        {/* Group */}
        <div>
          <button id="wd-add-assignment-group" className="btn btn-success me-2">
            + Group
          </button>

          {/* Assignment */}
          <button id="wd-add-assignment" className="btn btn-primary">
            + Assignment
          </button>
        </div>
      </div>

      {/* Assignmnets Header with Oval-shaped Pill thing */}
      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h3 id="wd-assignments-title" className="mb-0">
            ASSIGNMENTS
          </h3>

          {/* Pill Thing */}
          <div className="pill bg-secondary text-white px-3 py-1 rounded-pill">
            40% of Total
          </div>
          <button className="btn btn-outline-secondary">+</button>
        </div>
      </div>

      {/* Assignment List */}
      <ul id="wd-assignment-list" className="list-group">
        {assignments.map((assignment) => (
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
                  <Link
                    to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link text-dark text-decoration-none d-block mb-2"
                  >
                    {assignment.title}
                  </Link>
                  <div className="text-muted">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    {/* <strong>Not available until</strong>{" "}
                    {assignment.availableOn} at {assignment.timeDue} | */}
                    <strong>Not available until</strong> 12/1/2024 at 00:00AM |
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
