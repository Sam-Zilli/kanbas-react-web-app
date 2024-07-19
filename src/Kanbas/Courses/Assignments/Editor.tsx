import { useParams, useLocation } from 'react-router-dom'
import { courses } from "../../Database";

export default function AssignmentEditor() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      {/* Assignment Name and Description */}
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input
        id="wd-name"
        className="form-control mb-3"
        value="A1 - ENV + HTML"
      />
      <br />
      <br />
      <textarea
        id="wd-description"
        className="form-control mb-3"
        rows={10}
        cols={50}
      >
        The assignment is available online. Submit a link to the landing page of
        your web application running in Netlify. The landing page should include
        the following: Your full name and section. Links to each of the lab
        assignments. Link to Kanbas application. Links to all relevant source
        code repositories. The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />

      {/* Table for Points, Group, Display Grade As */}
      <table className="table mb-4">
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" className="form-control" value={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" className="form-select">
                <option selected value="ASSIGNMENTS">
                  ASSIGNMENTS
                </option>
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
              <select id="wd-display-grade-as" className="form-select">
                <option selected value="PERCENTAGE">
                  Percentage
                </option>
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
            <select id="wd-submission-type" className="form-select mb-3">
              <option selected value="ONLINE">
                Online
              </option>
            </select>
            <div className="checkbox-group mb-3">
              <input
                type="checkbox"
                name="check-entry-type"
                id="wd-text-entry"
              />
              <label htmlFor="wd-text-entry"> Text Entry</label>
              <br />
              <input
                type="checkbox"
                name="check-entry-type"
                id="wd-website-url"
              />
              <label htmlFor="wd-website-url"> Website URL</label>
              <br />
              <input
                type="checkbox"
                name="check-entry-type"
                id="wd-media-recordings"
              />
              <label htmlFor="wd-media-recordings"> Media Recordings</label>
              <br />
              <input
                type="checkbox"
                name="check-entry-type"
                id="wd-student-annotation"
              />
              <label htmlFor="wd-student-annotation"> Student Annotation</label>
              <br />
              <input
                type="checkbox"
                name="check-entry-type"
                id="wd-file-upload"
              />
              <label htmlFor="wd-file-upload"> File Uploads</label>
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
              placeholder="Everyone"
            />
            <label htmlFor="wd-due-date">Due</label>
            <input
              type="date"
              id="wd-due-date"
              className="form-control mb-3"
              value="2024-05-13"
            />
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="wd-available-from">Available from</label>
                <input
                  type="date"
                  id="wd-available-from"
                  className="form-control"
                  value="2024-05-06"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="wd-available-until">Until</label>
                <input
                  type="date"
                  id="wd-available-until"
                  className="form-control"
                  value="2024-05-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <button className="btn btn-secondary me-2">Cancel</button>
      <button className="btn btn-primary">Save</button>
    </div>
  );
}