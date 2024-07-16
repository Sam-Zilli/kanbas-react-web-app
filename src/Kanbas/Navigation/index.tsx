import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KanbasNavigation() {
  return (
    <div id="wd-kanbas-navigation" style={{ width: 110 }}
         className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a id="wd-neu-link" target="_blank" 
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0">
        <img src="/images/NEU.png" width="75px" /> </a>

      <a id="wd-account-link" href="#/Kanbas/Account"
        className="list-group-item text-white
                   bg-black text-center border-0">
        <FaRegCircleUser className="fs-1 text text-white" /><br />
        Account </a>

      <a id="wd-dashboard-link" href="#/Kanbas/Dashboard"
        className="list-group-item text-center border-0
                   bg-white text-danger">
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard </a>
      <a id="wd-course-link" href="#/Kanbas/Courses"
        className="list-group-item text-white
                   bg-black text-center border-0">
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses </a>

      {/* complete styling the rest of the links */}


      {/* Calendar Icon */}
      <a id="wd-course-link" href="#/Kanbas/Courses"
        className="list-group-item text-white
                   bg-black text-center border-0">
        <IoCalendarOutline className="fs-1 text-danger" /><br />
        Calendar </a>


      {/* Inbox Icon */}
        <a id="wd-course-link" href="#/Kanbas/Courses"
        className="list-group-item text-white
                   bg-black text-center border-0">
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox </a>


      {/* Labs Icon */}
        <a id="wd-course-link" href="#/Kanbas/Courses"
        className="list-group-item text-white
                   bg-black text-center border-0">
        <LiaCogSolid className="fs-1 text-danger" /><br />
        Labs </a>




    </div>

);}




// ASSIGNMENT 1:
// export default function KanbasNavigation() {
//     return (
//       <ul id="wd-kanbas-navigation">
//         <li><a id="wd-neu-link" href="https://www.northeastern.edu/">Northeastern</a></li>
//         <li><a id="wd-account-link" href="#/Kanbas/Account">Account</a></li>
//         <li><a id="wd-dashboard-link" href="#/Kanbas/Dashboard">Dashboard</a></li>
//         <li><a id="wd-course-link" href="#/Kanbas/Courses">Courses</a></li>
//         <li><a id="wd-calendar-link" href="#/Kanbas/Calendar">Calendar</a></li>
//         <li><a id="wd-inbox-link" href="#/Kanbas/Inbox">Inbox</a></li>
//         <li><a id="wd-labs-link" href="#/Labs">Labs</a></li>
//         {/* <li><a id="wd-landingPage-link" href="/">Landing Page</a></li> */}
//       </ul>
//   );}
  