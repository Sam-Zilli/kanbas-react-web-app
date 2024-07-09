import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentById, updateAssignmentById } from '../assignmentList'; 

interface Assignment {
  id: number;
  name: string;
  description: string;
  points: number;
  dueDate: string;
}

function AssignmentEditor() {
  const { id } = useParams<{ id: string }>();
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    if (id) { 
      const fetchedAssignment = getAssignmentById(parseInt(id));
      if (fetchedAssignment) {
        setAssignment(fetchedAssignment);
      }
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (assignment) {
      setAssignment(prevState => ({
        ...prevState!,
        [id === "wd-name" ? "name" : id === "wd-description" ? "description" : id === "wd-points" ? "points" : "dueDate"]: value
      }));
    }
  };

  const handleSave = () => {
    if (assignment) {
      updateAssignmentById(assignment.id, assignment);
      alert('Assignment saved!');
    }
  };

  if (!assignment) return <div>Loading...</div>;

  return (
    <div id="wd-assignments-editor">
      <h1>Assignment Name</h1>
      <input id="wd-name" value={assignment.name} onChange={handleChange} /><br /><br />
      
      <h1>Description</h1>
      <textarea id="wd-description" value={assignment.description} onChange={handleChange} />
      
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={assignment.points} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="dueDate">Due Date</label>
            </td>
            <td>
              <input id="wd-due-date" value={assignment.dueDate} onChange={handleChange} />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default AssignmentEditor;