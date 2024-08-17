// src/Kanbas/Dashboard.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import * as client from "../Courses/client";

// Define the props type
interface DashboardProps {
  courses: any[];
  setCourses: (courses: any[]) => void;
  course: any;
  setCourse: (course: any) => void;
  currentUser: any;
}

export default function Dashboard({
  courses,
  setCourses,
  course,
  setCourse,
  currentUser
}: DashboardProps) {
  const [formErrors, setFormErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [courseExistsError, setCourseExistsError] = useState<string | null>(null);

  const courseNumbers = currentUser.courses;
  const filteredCourses = courses.filter((course) => courseNumbers.includes(course.number));

  const fetchCourses = useCallback(async () => {
    const fetchedCourses = await client.fetchAllCourses();
    setCourses(fetchedCourses);
  }, [setCourses]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);



  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => (c._id === course._id ? course : c))
    );
  };

  const validateForm = () => {
    const errors: any = {};
    if (!course.name) errors.name = "Course name is required";
    if (!course.number) errors.number = "Course number is required";
    if (!course.startDate) errors.startDate = "Start date is required";
    if (!course.endDate) errors.endDate = "End date is required";
    if (!course.description) errors.description = "Description is required";
    if (new Date(course.startDate) > new Date(course.endDate)) errors.dateRange = "End date must be after start date";
    return errors;
  };



  const addNewCourse = async () => {
    console.log("in index.tsx addNewCourse")
    try {
      const updatedCourses = await client.createCourse(course, currentUser);
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  
  const handleCreateCourse = async () => {
    console.log("In index.tsx handleCreateCourse")
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setCourseExistsError(null);
    setLoading(true);
    try {
      const exists = false; // WILL ADD CHECK HERE IF COURSE NUM ALRADY EXISTS
      if (exists) {
        setCourseExistsError("Course number already exists");
        return;
      }
      await addNewCourse();
      setCourse({
        name: "",
        number: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to create course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setLoading(true);
    try {
      await updateCourse();
      setCourse({
        name: "",
        number: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to update course:", error);
    } finally {
      setLoading(false);
    }
  };

  const defaultImage = "./images/default.jpg";

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      
      <h5>{course._id ? "Edit Course" : "New Course"}</h5>
      
      {/* New/Edit Course Form */}
      <form>
        <div className="form-group">
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            id="name"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
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
            value={course.number}
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
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
            value={course.startDate}
            onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
            className={`form-control ${formErrors.startDate ? 'is-invalid' : ''}`}
          />
          {formErrors.startDate && <div className="invalid-feedback">{formErrors.startDate}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            value={course.endDate}
            onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
            className={`form-control ${formErrors.endDate ? 'is-invalid' : ''}`}
          />
          {formErrors.endDate && <div className="invalid-feedback">{formErrors.endDate}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
            placeholder="Enter course description"
          />
          {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
        </div>

        {formErrors.dateRange && <div className="text-danger">{formErrors.dateRange}</div>}

        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={handleCreateCourse}
          disabled={loading || course._id}
        >
          {loading ? 'Creating...' : 'Create Course'}
        </button>

        {course._id && (
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleUpdateCourse}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Course'}
          </button>
        )}
      </form>

      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({filteredCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <Link
                to={`/Kanbas/Courses/${course._id}/Home`}
                className="text-decoration-none"
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
                    <button
                      type="button"
                      className="btn btn-outline-danger ms-2"
                      onClick={() => deleteCourse(course._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
