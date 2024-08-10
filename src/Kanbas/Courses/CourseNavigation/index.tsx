import { useParams, useLocation } from "react-router";
import { courses } from "../../Database";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People"
  ];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <a
          key={`${cid}-${link}`}
          href={`#/Kanbas/Courses/${cid}/${link}`}
          className={pathname.includes(link.toLowerCase()) ? "active" : ""}
        >
          {link}
        </a>
      ))}
    </div>
  );
}