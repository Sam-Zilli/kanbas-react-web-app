import courseList from "../Courses/courseList"
import  "./dashboard.css"

export default function Dashboard() {
    return (
    <div className="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />

        <div className="wd-dashboard-courses">
        {courseList.map((course, index) => (
          <div key={index} className="wd-dashboard-course">
            <img src={course.image} width={200} alt="Course Thumbnail" />
            <div>
              <a className="wd-dashboard-course-link" href={course.link}>
                {course.name}
              </a>
              <p className="wd-dashboard-course-title">{course.description}</p>
              <a href={course.link}>Go</a>
            </div>
          </div>
        ))}
        </div>
    </div>
  );}