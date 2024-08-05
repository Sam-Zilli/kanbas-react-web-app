import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {

  // Delete an assignment
  app.delete('/api/assignments/:id', (req, res) => {
    const { id } = req.params;
    const index = Database.assignments.findIndex(a => a._id === id);

    if (index !== -1) {
      Database.assignments.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.status(404).send('Assignment not found');
    }
  });




  // Create an assignment
  app.post('/api/courses/:cid/assignments', (req, res) => {
    const newAssignment = {...req.body,
    course: cid,
    _id: new Date().getTime().toString(),
  };
    Database.assignments.push(newAssignment);
    res.status(201).send(newAssignment);
  });

  // Retrieve all assignments
  app.get('/api/assignments', (req, res) => {
    const assignments = Database.assignments;
    res.send(assignments);
  });

  // Retrieve a specific assignment
  app.get('/api/assignments/:id', (req, res) => {
    const assignment = Database.assignments.find(a => a._id === req.params.id);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).send('Assignment not found');
    }
  });

  // Update an assignment
  app.put('/api/assignments/:id', (req, res) => {
    const { id } = req.params;
    const index = Database.assignments.findIndex(a => a._id === id);

    if (index !== -1) {
      Database.assignments[index] = { ...Database.assignments[index], ...req.body };
      res.send(Database.assignments[index]);
    } else {
      res.status(404).send('Assignment not found');
    }
  });


}
