import { useParams } from "react-router";
import { courses } from "../../Database";

import "./index.css"

export default function CoursesNavigation() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades"];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link, index) => (
        <a key={index} href={`#/Kanbas/Courses/${course?._id}/${link.toLowerCase()}`}>
          {link}
        </a>
      ))}
    </div>
  );
}