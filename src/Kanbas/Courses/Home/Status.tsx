import "./status.css";

export default function CourseStatus() {
    return (
      <div id="wd-course-status">
        <h2>Course Status</h2>
        <div className="button-container">
        <button>Unpublish</button> <button>Publish</button> 
        </div>
        <div className="button-container-2">
        <button> Import Existing content</button>
        <button> Choose Home Page</button>
        <button> View Course Stream</button>
        <button> New Announcement</button>
        <button> New analytics</button>
        <button>View Course Notifications</button>
        </div>
      </div>
  );}
  