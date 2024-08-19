import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { FaFileImport, FaFileExport } from 'react-icons/fa';
import { BsGear } from 'react-icons/bs';
import { useParams } from "react-router";
import { enrollments, users, assignments, grades } from "../../Database";

export default function Grades() {
  
  const { cid } = useParams();
  const filteredAssignments = assignments.filter(assignment => assignment.course === cid);
  
  const getFullName = (userId: string) => {
    const user = users.find(user => user._id === userId);
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return "Unknown User";
  };
    const getGrade = (userId:string, assignmentId:string) => {
      const grade = grades.find(g => g.student === userId && g.assignment === assignmentId);
      return grade ? grade.grade : ''; 
    };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-secondary me-2" style={{ backgroundColor: '#6c757d', color: 'white' }}>
          <FaFileImport className="me-1" /> Import
        </button>
        <button className="btn btn-secondary me-2" style={{ backgroundColor: '#6c757d', color: 'white' }}>
          <FaFileExport className="me-1" /> Export
        </button>
        <button className="btn btn-secondary" style={{ backgroundColor: '#6c757d', color: 'white' }}>
          <BsGear />
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="d-flex flex-column">
            <label htmlFor="search-student" className="mb-1">Student Names</label>
            <div className="position-relative mb-3">
              <input
                id="search-student"
                type="text"
                className="form-control ps-5"
                placeholder="Search Students"
              />
              <FaMagnifyingGlass className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column">
            <label htmlFor="search-assignment" className="mb-1">Assignment Names</label>
            <div className="position-relative">
              <input
                id="search-assignment"
                type="text"
                className="form-control ps-5"
                placeholder="Search Assignments"
              />
              <FaMagnifyingGlass className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <button className="btn" style={{ backgroundColor: '#6c757d', color: 'white' }}>
          <CiFilter className="me-1" /> Apply Filter
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student Name</th>
              {filteredAssignments.map((assignment) => (
                <th key={assignment._id}>{assignment.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enrollments
              .filter(enrollment => enrollment.course === cid)
              .map((enrollment) => (
                <tr key={enrollment._id}>
                  <td>{getFullName(enrollment.user)}</td>
                  {filteredAssignments.map((assignment) => (
                    <td key={assignment._id}>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={getGrade(enrollment.user, assignment._id)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}