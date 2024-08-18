// src/Kanbas/Courses/index.tsx
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";
import { Route, Routes, useLocation, useParams } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import QuizList from "./Quizzes/index";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizQuestionsEditor from "./Quizzes/QuizQuestionsEditor";
import QuizPreview from "./Quizzes/QuizPreview";
import RoleBasedRoute from "../roleBasedRoute";

export default function Courses({ courses }: { courses: any[] }) {
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

          {/* The list of quizzes page */}
          <Route path="Quizzes" element={<QuizList />} />


          <Route
            path="Quizzes/new"
            element={
              <RoleBasedRoute requiredRole="FACULTY">
                <QuizEditor />
              </RoleBasedRoute>
            }
          />


          <Route path="Quizzes/:qid" element={<QuizDetails />} />

{/* 
          <Route
            path="Quizzes/:qid/questions"
            element={<QuizQuestionsEditor />}
          /> */}


          <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />


          <Route path="Quizzes/:qid/edit" element={<QuizEditor /> } />

          <Route path="Grades" element={<Grades />} />
          <Route path="People" element={<PeopleTable />} />
          <Route path="People/:uid" element={<PeopleTable />} />
        </Routes>
      </div>
    </div>
  );
}
