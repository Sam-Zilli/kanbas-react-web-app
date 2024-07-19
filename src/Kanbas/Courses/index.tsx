// src/Kanbas/Courses/index.tsx
import { courses } from "../Database";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
// TDL: A3 3.5ish is using Navigate but I'm not?
import {Route, Routes, useLocation, useParams } from "react-router";
import { FaAlignJustify } from 'react-icons/fa';

export default function Courses() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
<div id="wd-courses">
  <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
  </h2>
  <hr />
  <CoursesNavigation />
  <div>
    <Routes>
      <Route path="Home" element={<Home />} />
      <Route path="Modules" element={<Modules />} />
      <Route path="Assignments" element={<Assignments />} />
      <Route path="Assignments/:aid" element={<AssignmentEditor />} />
    </Routes>
  </div>
</div>
  );
}
