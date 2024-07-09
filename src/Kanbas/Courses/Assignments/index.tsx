import assignmentList from "./assignmentList";
export default function Assignments() {
    return (
      <div id="wd-assignments">
        <input id="wd-search-assignment"
               placeholder="Search for Assignments" />
        <button id="wd-add-assignment-group">+ Group</button>
        <button id="wd-add-assignment">+ Assignment</button>
        
        <h3 id="wd-assignments-title">
          ASSIGNMENTS 40% of Total <button>+</button>
        </h3>
        
        <ul id="wd-assignment-list">
          {assignmentList.map((assignment, index) => (
            <li className="wd-assignment-list-item">
              <div key={index} className="wd-assignment">
                <div>
                <a className="wd-assignment-link" href={`#/Kanbas/Courses/1234/Assignments/Editor/${assignment.id}`}>
                  {assignment.name}
                </a>
                <p className="wd-assignment-title">{assignment.description}</p>
                </div>
                <p className="wd-assignment-due-date">Due Date: {assignment.dueDate}</p>
                <p className="wd-assignment-points">Points: {assignment.points}</p>

              </div>
            </li>
        ))}
        </ul>
      </div>
);}
