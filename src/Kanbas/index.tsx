import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate} from "react-router";
import Courses from "./Courses";
// import AssignmentEditor from "./Courses/Assignments/Editor";

export default function Kanbas() {
  return (
    // A2 Part 4: Styling Kanbas with CSS and Bootstrap
<div id="wd-kanbas">
  <table width="100%">
    <tr>
      <td valign="top">
      <KanbasNavigation />
      </td><td valign="top">
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="Dashboard" />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Courses/:cid/*" element={<Courses />} />
      </Routes>
    </div>
      </td></tr>
  </table>
</div>

);}

