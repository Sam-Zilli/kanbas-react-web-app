let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];


// CITATION: SAMPLE DATA GENERATED BY CHAT GPT. IT WAS PROVIDED WITH THE TEMPLATE OF AN ASSIGNMENT ITEM AND I TOLD IT TO MAKE MORE INSTANCES.
const assignments = [
    {
      id: 1,
      title: "NodeJS Assignment",
      description: "Create a NodeJS server with ExpressJS.",
      due: "2024-09-10",
      completed: false,
      score: 75,
    },
    {
      id: 2,
      title: "ReactJS Project",
      description: "Develop a frontend application using ReactJS.",
      due: "2024-10-01",
      completed: true,
      score: 88,
    },
    {
      id: 3,
      title: "Database Setup",
      description: "Set up and configure a database for the project.",
      due: "2024-11-15",
      completed: false,
      score: 62,
    },
    {
      id: 4,
      title: "API Integration",
      description: "Integrate external APIs into the application.",
      due: "2024-12-05",
      completed: true,
      score: 91,
    },
    {
      id: 5,
      title: "Frontend Development",
      description: "Build the user interface for the application.",
      due: "2024-10-20",
      completed: true,
      score: 84,
    },
    {
      id: 6,
      title: "Backend Development",
      description: "Develop the backend logic and services.",
      due: "2024-11-30",
      completed: false,
      score: 78,
    },
    {
      id: 7,
      title: "Unit Testing",
      description: "Write and execute unit tests for the application.",
      due: "2024-12-10",
      completed: true,
      score: 90,
    },
    {
      id: 8,
      title: "Deployment",
      description: "Deploy the application to a live environment.",
      due: "2024-12-25",
      completed: false,
      score: 0,
    },
    {
      id: 9,
      title: "Code Review",
      description: "Review the code and provide feedback.",
      due: "2024-11-20",
      completed: true,
      score: 85,
    },
    {
      id: 10,
      title: "Documentation",
      description: "Write documentation for the application.",
      due: "2024-10-30",
      completed: false,
      score: 0,
    }
  ];
  

// Express routes for todos and assignments
export default function WorkingWithArrays(app) {
  // Routes for todos
  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
    } else {
      res.json(todos);
    }
  });

  app.get("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });

  app.get("/lab5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex > -1) {
      todos.splice(todoIndex, 1);
    }
    res.json(todos);
  });

  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
    }
    res.json(todos);
  });

  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.completed = completed;
    res.json(todos);
  });


  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.description = description;
    res.json(todos);
  });



  // Routes for assignments
  app.get("/lab5/assignments", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedAssignments = assignments.filter((a) => a.completed === completedBool);
      res.json(completedAssignments);
    } else {
      res.json(assignments);
    }
  });

  app.get("/lab5/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = assignments.find((a) => a.id === parseInt(id));
    res.json(assignment);
  });

  app.get("/lab5/assignments/:id/delete", (req, res) => {
    const { id } = req.params;
    const assignmentIndex = assignments.findIndex((a) => a.id === parseInt(id));
    if (assignmentIndex > -1) {
      assignments.splice(assignmentIndex, 1);
    }
    res.json(assignments);
  });

  app.get("/lab5/assignments/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const assignment = assignments.find((a) => a.id === parseInt(id));
    if (assignment) {
      assignment.title = title;
    }
    res.json(assignments);
  });

  app.get("/lab5/assignments/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const assignment = assignments.find((a) => a.id === parseInt(id));
    if (assignment) {
      assignment.description = description;
    }
    res.json(assignments);
  });

  app.get("/lab5/assignments/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const assignment = assignments.find((a) => a.id === parseInt(id));
    if (assignment) {
      assignment.completed = completed === "true";
    }
    res.json(assignments);
  });
}