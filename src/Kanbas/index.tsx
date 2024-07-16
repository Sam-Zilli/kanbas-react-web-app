import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate} from "react-router";
import Grades from "./Courses/Grades/Grades";
import Courses from "./Courses";
import "./styles.css"
// import AssignmentEditor from "./Courses/Assignments/Editor";

export default function Kanbas() {
  return (
    // A2 Part 4: Styling Kanbas with CSS and Bootstrap
<div id="wd-kanbas">
  <table width="100%">
    <tr>
      <td valign="top">
      <KanbasNavigation />
      </td>
      

      {/* A2 4.1 Page 27 */}
      <div className="wd-main-content-offset p-3">
      <td valign="top">
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="Dashboard" />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Courses/:cid/*" element={<Courses />} />
        <Route path="Courses/:cid/Grades" element={<Grades />} />
      </Routes>
    </div>
      </td>
      </div>
    </tr>
  </table>
</div>

);}

