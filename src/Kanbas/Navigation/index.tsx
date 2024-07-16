import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import "./kanbasNavigation.css"

/*
TDL: 
  A2 4.1, page 26, issue where navigation icon clicked should have white background and red text...
*/


export default function KanbasNavigation() {
  return (
    <div id="wd-kanbas-navigation" style={{ width: 110 }}
         className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a id="wd-neu-link" rel="noreferrer" target="_blank" 
        href="https://www.northeastern.edu/"
        className="list-group-item">
        <img src="/images/NEU.png" alt="N in the Northeastern logo format" width="75px" /> </a>

      <a id="wd-account-link" href="#/Kanbas/Account"
                className="list-group-item nav-link">
        <FaRegCircleUser className="fs-1 text text-white" /><br />
        Account </a>

      <a id="wd-dashboard-link" href="#/Kanbas/Dashboard"
                className="list-group-item nav-link">
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard </a>
      <a id="wd-course-link" href="#/Kanbas/Courses"
                className="list-group-item nav-link">
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses </a>

      {/* complete styling the rest of the links */}


      {/* Calendar Icon */}
      <a id="wd-calendar-link" href="#/Kanbas/Calendar"
                className="list-group-item nav-link">
        <IoCalendarOutline className="fs-1 text-danger" /><br />
        Calendar </a>


      {/* Inbox Icon */}
        <a id="wd-inbox-link" href="#/Kanbas/Inbox"
        className="list-group-item nav-link">
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox </a>


      {/* Labs Icon */}
        <a id="wd-labs-link" href="#/Kanbas/Labs"
        className="list-group-item nav-link">
        <LiaCogSolid className="fs-1 text-danger" /><br />
        Labs </a>
    </div>

);}