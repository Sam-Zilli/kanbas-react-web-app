import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { FaFileImport, FaFileExport } from 'react-icons/fa';
import { BsGear } from 'react-icons/bs';
import fakeGradesData, { Student } from './fakeGradesData';

export default function Grades() {
  return (
    <div className="container mt-4">
      {/* Top Buttons */}
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

      {/* Search and Filter */}
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

      {/* Apply Filter Button */}
      <div className="mb-4">
        <button className="btn" style={{ backgroundColor: '#6c757d', color: 'white' }}>
          <CiFilter className="me-1" /> Apply Filter
        </button>
      </div>

      {/* Grades Table */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>A1</th>
              <th>A2</th>
              <th>A3</th>
              <th>A4</th>
            </tr>
          </thead>
          <tbody>
            {fakeGradesData.map((student: Student) => (
              <tr key={student.id}>
                <td>{student.studentName}</td>
                <td><input type="number" className="form-control" defaultValue={student.A1} /></td>
                <td><input type="number" className="form-control" defaultValue={student.A2} /></td>
                <td><input type="number" className="form-control" defaultValue={student.A3} /></td>
                <td><input type="number" className="form-control" defaultValue={student.A4} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}