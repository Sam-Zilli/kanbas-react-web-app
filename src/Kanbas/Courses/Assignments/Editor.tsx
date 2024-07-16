export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" rows={10} cols={50}>
        The assignment is available online Submit a link to the landing page of
        your web application running in Netlify. The landing page should include
        the following: Your full name and section Links to each of the lab assignments
        Link to Kanbas application Links to al relevant source code repositiories The Kanbas application
        should include a link to navigate back to the landing page.
      </textarea>
      <br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option selected value="ASSIGNMENTS">
                  Assignments
                </option>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="PROJECTS">Projects</option>
              </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option selected value="PERCENTAGE">
                  Percentage
                </option>
              </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option selected value="ONLINE">
                  Online
                </option>
              </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label>Online Entry Options</label>
            </td>
            <td>
              <div className="checkbox-group">
                <input type="checkbox" name="check-entry-type" id="wd-text-entry" />
                <label htmlFor="wd-text-entry">Text Entry</label>
                <br />
                <input type="checkbox" name="check-entry-type" id="wd-wd-website-url" />
                <label htmlFor="wd-website-url">Website URL</label>
                <br />
                <input type="checkbox" name="check-entry-type" id="wd-media-recordings" />
                <label htmlFor="wd-media-recordings">Media Recordings</label>
                <br />
                <input type="checkbox" name="check-entry-type" id="wd-student-annotation" />
                <label htmlFor="wd-student-annotation">Student Annotation</label>
                <br />
                <input type="checkbox" name="check-entry-type" id="wd-file-upload" />
                <label htmlFor="wd-file-upload">File Uploads</label>
              </div>
            </td>
          </tr>
        
  <div id="wd-forms">
  <form id="wd-text-fields">
    <h5>Assign Assign to</h5>
    <input id="wd-assign-to" placeholder="Everyone" />
    <br />    
    <br />
    <label htmlFor="wd-due-date"> Due </label>
      <input type="date"
        id="wd-due-date"
        value="2024-05-13"/>
    <br/>
    <label htmlFor="wd-available-from"> Available from </label>
      <input type="date"
        id="wd-available-from"
        value="2024-05-06"/>
    <label htmlFor="wd-available-until"> Until </label>
      <input type="date"
        id="wd-available-until"
        value="2024-05-20"/>
    <br/>
  </form>
</div>

        </tbody>
      </table>
      <hr />
      <button>Cancel</button><button>Save</button>
    </div>
  );
}





// import React, { useState, useEffect, ChangeEvent } from 'react';
// import { useParams } from 'react-router-dom';
// import { getAssignmentById, updateAssignmentById } from './assignmentList';

// interface Assignment {
//   id: number;
//   name: string;
//   description: string;
//   points: number;
//   dueDate: string;
// }

// function AssignmentEditor() {
//   const { id } = useParams<{ id: string }>();
//   const [assignment, setAssignment] = useState<Assignment | null>(null);

//   useEffect(() => {
//     if (id) {
//       const fetchedAssignment = getAssignmentById(parseInt(id));
//       if (fetchedAssignment) {
//         setAssignment(fetchedAssignment);
//       }
//     }
//   }, [id]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { id, value } = e.target;
//     if (assignment) {
//       setAssignment(prevState => ({
//         ...prevState!,
//         [id === "wd-name" ? "name" : id === "wd-description" ? "description" : id === "wd-points" ? "points" : "dueDate"]: value
//       }));
//     }
//   };

//   const handleSave = () => {
//     if (assignment) {
//       updateAssignmentById(assignment.id, assignment);
//       alert('Assignment saved!');
//     }
//   };

//   if (!assignment) return <div>Loading...</div>;

//   return (
//     <div id="wd-assignments-editor">
//       <h1>Assignment Name</h1>
//       <input id="wd-name" value={assignment.name} onChange={handleChange} /><br /><br />

//       <h1>Description</h1>
//       <textarea id="wd-description" value={assignment.description} onChange={handleChange} />

//       <br />
//       <table>
//         <tbody>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="points">Points</label>
//             </td>
//             <td>
//               <input id="wd-points" value={assignment.points} onChange={handleChange} />
//             </td>
//           </tr>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="dueDate">Due Date</label>
//             </td>
//             <td>
//               <input id="wd-due-date" value={assignment.dueDate} onChange={handleChange} />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// }

// export default AssignmentEditor;
