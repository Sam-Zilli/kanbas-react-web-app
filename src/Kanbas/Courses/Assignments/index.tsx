export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input id="wd-search-assignment" placeholder="Search for Assignments" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123"
          >
            A1 - ENV + HTML
          </a>
          <br />
          Multiple Modules | <strong>Not available until</strong> May 6 at
          12:00am |
          <br />
          <strong>Due</strong> May 13 at 11:59pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123"
          >
            A2 - CSS + BOOTSTRAP
          </a>
          <br />
          Multiple Modules | <strong>Not available until</strong> May 13 at
          12:00am |
          <br />
          <strong>Due</strong> May 20 at 11:59pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123"
          >
            A3 - JAVASCRIPT + REACT
          </a>
          <br />
          Multiple Modules | <strong>Not available until</strong> May 20 at
          12:00am |
          <br />
          <strong>Due</strong> May 27 at 11:59pm | 100 pts
        </li>
      </ul>
    </div>
  );
}

// import assignmentList from "./assignmentList";
// export default function Assignments() {
//     return (
//       <div id="wd-assignments">
//         <input id="wd-search-assignment"
//                placeholder="Search for Assignments" />
//         <button id="wd-add-assignment-group">+ Group</button>
//         <button id="wd-add-assignment">+ Assignment</button>
//         <h3 id="wd-assignments-title">
//           ASSIGNMENTS 40% of Total <button>+</button>
//         </h3>
//         <ul id="wd-assignment-list">
//           {assignmentList.map((assignment, index) => (
//             <li className="wd-assignment-list-item">
//               <div key={index} className="wd-assignment">
//                 <div>
//                 <a className="wd-assignment-link" href={`#/Kanbas/Courses/1234/Assignments/Editor/${assignment.id}`}>
//                   {assignment.name}
//                 </a>
//                 <p className="wd-assignment-title">{assignment.description}</p>
//                 </div>
//                 <p className="wd-assignment-due-date">Due Date: {assignment.dueDate}</p>
//                 <p className="wd-assignment-points">Points: {assignment.points}</p>
//               </div>
//             </li>
//         ))}
//         </ul>
//       </div>
// );}
