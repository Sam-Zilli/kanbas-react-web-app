export default function AssignmentAdder({
  dialogTitle,
  assignmentName,
  setAssignmentName,
  description,
  setDescription,
  points,
  setPoints,
  dueDate,
  setDueDate,
  addAssignment,
}: {
  dialogTitle: string;
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  points: number;
  setPoints: (points: number) => void;
  dueDate: string;
  setDueDate: (dueDate: string) => void;
  addAssignment: () => void;
}) {
  return (
    <div
      id="wd-add-assignment-dialog"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="assignment-name" className="form-label">Name</label>
              <input
                className="form-control"
                id="assignment-name"
                value={assignmentName}
                placeholder="Assignment Name"
                onChange={(e) => setAssignmentName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="assignment-description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="assignment-description"
                rows={3}
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="assignment-points" className="form-label">Points</label>
              <input
                type="number"
                className="form-control"
                id="assignment-points"
                value={points}
                placeholder="Points"
                onChange={(e) => setPoints(Number(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="assignment-due-date" className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                id="assignment-due-date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={addAssignment}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Add Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}