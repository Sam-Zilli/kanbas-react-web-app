import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";



export default function AssignmentEditor() {
  return (
    <div>
      hey
    </div>
  )
}

// interface Assignment {
//   _id: string;
//   title: string;
//   description: string;
//   points: number;
//   group: string;
//   displayGradeAs: string;
//   submissionTypes: string[];
//   assignTo: string;
//   dueDate: string;
//   availableFrom: string;
//   availableUntil: string;
//   course: string;
// }

// export default function AssignmentEditor() {
//   const { aid } = useParams<{ aid: string }>();

//   const [assignment, setAssignment] = useState<Assignment>({
//     _id: "",
//     title: "",
//     description: "",
//     points: 0,
//     group: "ASSIGNMENTS",
//     displayGradeAs: "PERCENTAGE",
//     submissionTypes: [],
//     assignTo: "Everyone",
//     dueDate: "",
//     availableFrom: "",
//     availableUntil: "",
//     course: "",
//   });

//   useEffect(() => {
//     const fetchAssignmentDetails = async () => {
//       try {
//         if (!aid) return;

//         const foundAssignment = db.assignments.find(
//           (assignment) => assignment._id === aid
//         );
//         if (foundAssignment) {
//           setAssignment({
//             _id: foundAssignment._id,
//             title: foundAssignment.title,
//             description: foundAssignment.description,
//             points: foundAssignment.points,
//             group: foundAssignment.group,
//             displayGradeAs: foundAssignment.displayGradeAs,
//             submissionTypes: foundAssignment.submissionTypes,
//             assignTo: foundAssignment.assignTo,
//             dueDate: foundAssignment.dueDate,
//             availableFrom: foundAssignment.availableFrom,
//             availableUntil: foundAssignment.availableUntil,
//             course: foundAssignment.course,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching assignment details:", error);
//       }
//     };

//     fetchAssignmentDetails();
//   }, [aid]);

//   return (
//     <div id="wd-assignments-editor" className="container mt-4">
//       {/* Assignment Name and Description */}
//       <label htmlFor="wd-name">Assignment Name</label>
//       <br />
//       <input
//         id="wd-name"
//         className="form-control mb-3"
//         value={assignment.title}
//         onChange={(e) =>
//           setAssignment({ ...assignment, title: e.target.value })
//         }
//       />
//       <br />
//       <br />
//       <textarea
//         id="wd-description"
//         className="form-control mb-3"
//         rows={10}
//         cols={50}
//         value={assignment.description}
//         onChange={(e) =>
//           setAssignment({ ...assignment, description: e.target.value })
//         }
//       >
//         {assignment.description}
//       </textarea>
//       <br />

//       {/* Table for Points, Group, Display Grade As */}
//       <table className="table mb-4">
//         <tbody>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-points">Points</label>
//             </td>
//             <td>
//               <input
//                 id="wd-points"
//                 className="form-control"
//                 value={assignment.points}
//                 onChange={(e) =>
//                   setAssignment({
//                     ...assignment,
//                     points: parseInt(e.target.value) || 0,
//                   })
//                 }
//               />
//             </td>
//           </tr>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-group">Assignment Group</label>
//             </td>
//             <td>
//               <select
//                 id="wd-group"
//                 className="form-select"
//                 value={assignment.group}
//                 onChange={(e) =>
//                   setAssignment({ ...assignment, group: e.target.value })
//                 }
//               >
//                 <option value="ASSIGNMENTS">ASSIGNMENTS</option>
//                 <option value="QUIZZES">Quizzes</option>
//                 <option value="EXAMS">Exams</option>
//                 <option value="PROJECTS">Projects</option>
//               </select>
//             </td>
//           </tr>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-display-grade-as">Display Grade as</label>
//             </td>
//             <td>
//               <select
//                 id="wd-display-grade-as"
//                 className="form-select"
//                 value={assignment.displayGradeAs}
//                 onChange={(e) =>
//                   setAssignment({
//                     ...assignment,
//                     displayGradeAs: e.target.value,
//                   })
//                 }
//               >
//                 <option value="PERCENTAGE">Percentage</option>
//               </select>
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Submission Type Section */}
//       <div className="row mb-4">
//         <div className="col-md-4">
//           <h5>Submission Type</h5>
//         </div>
//         <div className="col-md-8">
//           <div className="border border-success rounded p-3 mb-4">
//             <select id="wd-submission-type" className="form-select mb-3">
//               <option value="ONLINE">Online</option>
//             </select>
//             <div className="checkbox-group mb-3">
//               <input
//                 type="checkbox"
//                 name="check-entry-type"
//                 id="wd-text-entry"
//               />
//               <label htmlFor="wd-text-entry"> Text Entry</label>
//               <br />
//               <input
//                 type="checkbox"
//                 name="check-entry-type"
//                 id="wd-website-url"
//               />
//               <label htmlFor="wd-website-url"> Website URL</label>
//               <br />
//               <input
//                 type="checkbox"
//                 name="check-entry-type"
//                 id="wd-media-recordings"
//               />
//               <label htmlFor="wd-media-recordings"> Media Recordings</label>
//               <br />
//               <input
//                 type="checkbox"
//                 name="check-entry-type"
//                 id="wd-student-annotation"
//               />
//               <label htmlFor="wd-student-annotation"> Student Annotation</label>
//               <br />
//               <input
//                 type="checkbox"
//                 name="check-entry-type"
//                 id="wd-file-upload"
//               />
//               <label htmlFor="wd-file-upload"> File Uploads</label>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Assign To Section */}
//       <div className="row mb-4">
//         <div className="col-md-4">
//           <h5>Assign To</h5>
//         </div>
//         <div className="col-md-8">
//           <div className="border border-primary rounded p-3">
//             <label htmlFor="wd-assign-to">Assign to</label>
//             <input
//               id="wd-assign-to"
//               className="form-control mb-3"
//               value={assignment.assignTo}
//               onChange={(e) =>
//                 setAssignment({ ...assignment, assignTo: e.target.value })
//               }
//             />
//             <label htmlFor="wd-due-date">Due</label>
//             <input
//               type="date"
//               id="wd-due-date"
//               className="form-control mb-3"
//               value={assignment.dueDate}
//               onChange={(e) =>
//                 setAssignment({ ...assignment, dueDate: e.target.value })
//               }
//             />
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label htmlFor="wd-available-from">Available from</label>
//                 <input
//                   type="date"
//                   id="wd-available-from"
//                   className="form-control"
//                   value={assignment.availableFrom}
//                   onChange={(e) =>
//                     setAssignment({
//                       ...assignment,
//                       availableFrom: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label htmlFor="wd-available-until">Until</label>
//                 <input
//                   type="date"
//                   id="wd-available-until"
//                   className="form-control"
//                   value={assignment.availableUntil}
//                   onChange={(e) =>
//                     setAssignment({
//                       ...assignment,
//                       availableUntil: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <hr />
//       <Link
//         to={`/Kanbas/Courses/${assignment.course}/Assignments`}
//         className="btn btn-secondary me-2"
//       >
//         Cancel
//       </Link>
//       <Link
//         to={`/Kanbas/Courses/${assignment.course}/Assignments`}
//         className="btn btn-primary"
//       >
//         Save
//       </Link>
//     </div>
//   );
// }