// import Modules from "../Modules";
// import CourseStatus from "./Status";
// // import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Home() {
//   {console.log("IN HGOMEE!!")}
//   return (
//     <table id="wd-home">
//       asdljkals;djka;lskd;alskd;alskd;laskd;aksd;lkas;dlkas;dka;sldk;asdk;alskd;laskd;ask
//       <tr>
//         <td valign="top">
//           <Modules />
//         </td>
//         <td valign="top">
//           <CourseStatus />
//         </td>
//       </tr>
//     </table>
//   );
// }


import React from 'react';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { courseId } = useParams();

  return (
    <div>
      <h1>Course Home</h1>
      <p>Course ID: {courseId}</p>
      {/* Fetch and display course details based on courseId */}
    </div>
  );
};

export default Home;