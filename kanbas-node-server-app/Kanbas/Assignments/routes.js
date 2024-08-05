import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {

// Create an assignment
app.post('api/assignments', (req, res) => {
    const newAssignment = { id: nextId++, ...req.body };
    _id: new Date().getTime().toString();
    Database.courses.push(course);
    res.send(newAssignment);
});

// Retrieve all assignments
app.get('api/assignments', (req, res) => {
    const assignments = Database.assignments;
    res.send(assignments)
});


// Retrieve a specific assignment
app.get('api/assignments/:id', (req, res) => {
    const assignment = assignments.find(a => a.id === parseInt(req.params.id));
    if (assignment) {
        res.json(assignment);
    } else {
        res.status(404).send('Assignment not found');
    }
});

// Update an assignment
app.put('api/assignments/:id', (req, res) => {
    const { id } = req.params;
    Database.assignments = Database.assignments.filter((a) => a._id !== id);
    res.sendStatus(204);
});

// Delete an assignment
app.delete('api/assignments/:id', (req, res) => {
    const { id } = req.params;
    Database.assignments = Database.assignments.filter((a) => a._id !== id);
    res.sendStatus(204);
});
}

