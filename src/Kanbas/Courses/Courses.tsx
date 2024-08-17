import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as client from './client'; 
import { Course } from '../types'; 
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch all courses
        const allCourses = await client.fetchAllCourses();
        setCourses(allCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) {
      return; // Handle case where user is not logged in
    }

    try {
      // Enroll the user in the selected course
      const response = await client.enrollInCourse(courseId, currentUser._id);
      
      // Check if the response indicates success
      if (response && response.success) {
        console.log('Successfully enrolled in the course!');
        alert('Successfully enrolled in the course!');
      } else {
        // Handle the case where the user is already enrolled
        setEnrollmentError(response.message || 'Failed to enroll in the course. Please try again.');
      }
    } catch (error) {
      console.error('Failed to enroll in course:', error);
      setEnrollmentError('Failed to enroll in the course. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading courses...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Course Offerings - Enroll here!</h1>
      {enrollmentError && <div className="alert alert-danger">{enrollmentError}</div>}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {courses.map((course) => (
          <div key={course._id} className="col mb-4">
            <div className="card">
              <img
                src={`/images/${course.name}.jpg`} 
                className="card-img-top"
                alt={course.name}
                onError={(e) => (e.currentTarget.src = '/images/default.jpg')}
              />
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
                <Button
                  variant="primary"
                  onClick={() => handleEnroll(course._id)}
                >
                  Enroll
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}