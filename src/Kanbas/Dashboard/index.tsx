import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as client from '../Courses/client';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Course } from '../types';
import { setCurrentUser } from '../Account/reducer';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formErrors, setFormErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [courseExistsError, setCourseExistsError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fetchCourses = useCallback(async () => {
    if (currentUser) {
      const courses = await client.fetchUsersCourses(currentUser._id);
      setCourses(courses);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async (course: Course) => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => (c._id === course._id ? course : c))
    );
  };

  const validateForm = (course: Course) => {
    const errors: any = {};
    if (!course.name) errors.name = "Course name is required";
    if (!course.number) errors.number = "Course number is required";
    if (!course.startDate) errors.startDate = "Start date is required";
    if (!course.endDate) errors.endDate = "End date is required";
    if (new Date(course.startDate) > new Date(course.endDate)) errors.dateRange = "End date must be after start date";
    return errors;
  };

  const handleSaveCourse = async () => {
    if (!selectedCourse) return;

    const errors = validateForm(selectedCourse);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setLoading(true);
    try {
      if (isEditing) {
        await updateCourse(selectedCourse);
      } else {
        const exists = courses.some(c => c.number === selectedCourse.number);
        if (exists) {
          setCourseExistsError("Course number already exists");
          return;
        }
        // Create Course
        await client.createCourse(selectedCourse, currentUser);
        // Fetch updated user data
        const updatedUser = await client.fetchUserById(currentUser._id);
        dispatch(setCurrentUser(updatedUser)); // Update Redux store
        fetchCourses();
      }
      setShowModal(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error("Failed to save course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (course?: Course) => {
    if (course) {
      setSelectedCourse(course);
      setIsEditing(true);
    } else {
      setSelectedCourse({
        _id: "",
        name: "",
        number: "",
        startDate: "",
        endDate: "",
        description: ""
      });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const defaultImage = "./images/default.jpg";

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Conditionally render the "Add Course" button */}
      {currentUser?.role === "FACULTY" && (
        <Button
          variant="primary"
          onClick={() => handleShowModal()}
        >
          New Course
        </Button>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <img
                  src={`/images/${course.name}.jpg`}
                  onError={(e) => {
                    e.currentTarget.src = defaultImage;
                  }}
                  height={160}
                  alt={course.name}
                />
                <div className="card-body">
                  <span
                    className="wd-dashboard-course-link"
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course.name}
                  </span>
                  <p
                    className="wd-dashboard-course-title card-text"
                    style={{ maxHeight: 53, overflow: "hidden" }}
                  >
                    {course.description}
                  </p>
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="btn btn-outline-primary"
                  >
                    View Course
                  </Link>
                  <Button
                    variant="warning"
                    className="ms-2"
                    onClick={() => handleShowModal(course)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => deleteCourse(course._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for editing or creating a course */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Course" : "New Course"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="name">Course Name</label>
              <input
                type="text"
                id="name"
                value={selectedCourse?.name || ''}
                onChange={(e) => setSelectedCourse({ ...selectedCourse!, name: e.target.value })}
                className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                placeholder="Enter course name"
              />
              {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="number">Course Number</label>
              <input
                type="text"
                id="number"
                value={selectedCourse?.number || ''}
                onChange={(e) => setSelectedCourse({ ...selectedCourse!, number: e.target.value })}
                className={`form-control ${formErrors.number || courseExistsError ? 'is-invalid' : ''}`}
                placeholder="Enter course number"
              />
              {formErrors.number && <div className="invalid-feedback">{formErrors.number}</div>}
              {courseExistsError && <div className="invalid-feedback">{courseExistsError}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={selectedCourse?.startDate || ''}
                onChange={(e) => setSelectedCourse({ ...selectedCourse!, startDate: e.target.value })}
                className={`form-control ${formErrors.startDate ? 'is-invalid' : ''}`}
              />
              {formErrors.startDate && <div className="invalid-feedback">{formErrors.startDate}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                value={selectedCourse?.endDate || ''}
                onChange={(e) => setSelectedCourse({ ...selectedCourse!, endDate: e.target.value })}
                className={`form-control ${formErrors.endDate || formErrors.dateRange ? 'is-invalid' : ''}`}
              />
              {formErrors.endDate && <div className="invalid-feedback">{formErrors.endDate}</div>}
              {formErrors.dateRange && <div className="invalid-feedback">{formErrors.dateRange}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={selectedCourse?.description || ''}
                onChange={(e) => setSelectedCourse({ ...selectedCourse!, description: e.target.value })}
                className="form-control"
                rows={3}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveCourse} disabled={loading}>
            {loading ? "Saving..." : "Save Course"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
