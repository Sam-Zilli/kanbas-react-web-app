import courseList from '../Courses/courseList';
import './dashboard.css';

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> 
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courseList.length})</h2> 
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {courseList.map((course, index) => (
                        <div key={index} className="col mb-4">
                            <div className="wd-dashboard-course" style={{ width: "250px" }}>
                                <a className="text-decoration-none text-dark" href={course.link}>
                                    <img src={course.image} width="100%" className="card-img-top" alt="Course Thumbnail" />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                                        <div className="mb-2">
                                            <span className="badge bg-secondary me-2">{course.term}</span>
                                            <span className="badge bg-secondary me-2">{course.year}</span>
                                            <span className="badge bg-secondary">{course.section}</span>
                                        </div>
                                        <p className="card-text">{course.description}</p>
                                        <button className="btn btn-primary">Go</button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}




// export default function Dashboard() {
//     return (
//     <div className="wd-dashboard">
//         <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//         <h2 id="wd-dashboard-published">Published Courses ({courseList.length})</h2> <hr />

//         <div className="wd-dashboard-courses">
//         {courseList.map((course, index) => (
//           <div key={index} className="wd-dashboard-course">
//             <img src={course.image} width={200} alt="Course Thumbnail" />
//             <div>
//               <a className="wd-dashboard-course-link" href={course.link}>
//                 {course.name}
//               </a>
//               <p className="wd-dashboard-course-title">{course.description}</p>
//               <a href={course.link}>Go</a>
//             </div>
//           </div>
//         ))}
//         </div>
//     </div>
//   );}