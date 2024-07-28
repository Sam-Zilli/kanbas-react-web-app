// src/Courses/Assignments/AssignmentsEditor.tsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { updateAssignment, deleteAssignment } from "./reducer";
import { Assignment } from "../../types";

export default function AssignmentsEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [assignment, setAssignment] = useState<Assignment | null>(null);

  const assignments = useSelector((state: RootState) => state.assignmentsReducer?.assignments || []);

  useEffect(() => {
    if (aid) {
      const fetchedAssignment = assignments.find(
        (assignment) => assignment._id === aid
      );
      if (fetchedAssignment) {
        setAssignment(fetchedAssignment);
      } else {
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
      }
    }
  }, [aid, assignments, navigate, cid]);

  const handleUpdate = () => {
    if (assignment) {
      dispatch(
        updateAssignment({
          ...assignment,
          name: assignment.name,
          description: assignment.description,
          points: assignment.points,
          group: assignment.group,
          displayGradeAs: assignment.displayGradeAs || '',
          submissionTypes: assignment.submissionTypes || [],
          assignTo: assignment.assignTo || '',
          dueDate: assignment.dueDate,
          availableFrom: assignment.availableFrom || '',
          availableUntil: assignment.availableUntil || ''
        })
      );
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    }
  };

  const handleDelete = () => {
    if (assignment) {
      dispatch(deleteAssignment(assignment._id));
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    }
  };

  if (!assignment) return <div>Loading...</div>;

  const submissionTypes = assignment.submissionTypes || [];

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <h3>Edit Assignment</h3>
      
      {/* Assignment Name and Description */}
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input
        id="wd-name"
        className="form-control mb-3"
        value={assignment.name}
        onChange={(e) =>
          setAssignment({ ...assignment, name: e.target.value })
        }
      />
      <br />
      <br />
      <textarea
        id="wd-description"
        className="form-control mb-3"
        rows={10}
        cols={50}
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <br />

      {/* Table for Points, Group, Display Grade As */}
      <table className="table mb-4">
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input
                id="wd-points"
                className="form-control"
                type="number"
                value={assignment.points}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    points: parseInt(e.target.value) || 0,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select
                id="wd-group"
                className="form-select"
                value={assignment.group}
                onChange={(e) =>
                  setAssignment({ ...assignment, group: e.target.value })
                }
              >
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="PROJECTS">Projects</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select
                id="wd-display-grade-as"
                className="form-select"
                value={assignment.displayGradeAs}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    displayGradeAs: e.target.value,
                  })
                }
              >
                <option value="PERCENTAGE">Percentage</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Submission Type Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <h5>Submission Type</h5>
        </div>
        <div className="col-md-8">
          <div className="border border-success rounded p-3 mb-4">
            <select
              id="wd-submission-type"
              className="form-select mb-3"
              value={submissionTypes.join(', ')}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  submissionTypes: e.target.value.split(', ').filter(type => type.trim() !== ''),
                })
              }
            >
              <option value="ONLINE">Online</option>
            </select>
            <div className="checkbox-group mb-3">
              {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map((type) => (
                <div key={type} className="form-check">
                  <input
                    type="checkbox"
                    id={`wd-${type.replace(/\s+/g, '-').toLowerCase()}`}
                    checked={submissionTypes.includes(type)}
                    onChange={() =>
                      setAssignment({
                        ...assignment,
                        submissionTypes: submissionTypes.includes(type)
                          ? submissionTypes.filter(t => t !== type)
                          : [...submissionTypes, type],
                      })
                    }
                  />
                  <label htmlFor={`wd-${type.replace(/\s+/g, '-').toLowerCase()}`}>
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assign To Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <h5>Assign To</h5>
        </div>
        <div className="col-md-8">
          <div className="border border-primary rounded p-3">
            <label htmlFor="wd-assign-to">Assign to</label>
            <input
              id="wd-assign-to"
              className="form-control mb-3"
              value={assignment.assignTo}
              onChange={(e) =>
                setAssignment({ ...assignment, assignTo: e.target.value })
              }
            />
            <label htmlFor="wd-due-date">Due</label>
            <input
              type="date"
              id="wd-due-date"
              className="form-control mb-3"
              value={assignment.dueDate}
              onChange={(e) =>
                setAssignment({ ...assignment, dueDate: e.target.value })
              }
            />
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="wd-available-from">Available from</label>
                <input
                  type="date"
                  id="wd-available-from"
                  className="form-control"
                  value={assignment.availableFrom}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      availableFrom: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="wd-available-until">Until</label>
                <input
                  type="date"
                  id="wd-available-until"
                  className="form-control"
                  value={assignment.availableUntil}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      availableUntil: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <Link
        to={`/Kanbas/Courses/${cid}/Assignments`}
        className="btn btn-secondary me-2"
      >
        Cancel
      </Link>
      <button
        className="btn btn-primary"
        onClick={handleUpdate}
      >
        Save
      </button>
    </div>
  );
}