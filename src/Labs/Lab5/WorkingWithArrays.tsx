import React, { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  
  const [errorMessage, setErrorMessage] = useState(null);
  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };
  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };


  
  const API = `${REMOTE_SERVER}/lab5/todos`;


  // Handler to update the todo description
  const handleUpdateDescription = () => {
    fetch(`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`, {
      method: 'PUT',
    }).then(response => {
      if (response.ok) {
        console.log("Description updated successfully");
      }
    });
  };

  // Handler to update the todo completed status
  const handleUpdateCompleted = () => {
    fetch(`${API}/${todo.id}/completed/${todo.completed}`, {
      method: 'PUT',
    }).then(response => {
      if (response.ok) {
        console.log("Completed status updated successfully");
      }
    });
  };

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos{" "}
      </a>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      <input
        id="wd-todo-id"
        value={todo.id}
        className="form-control w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h3>Creating new Items in an Array</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr />

      <h3>Updating an Item in an Array</h3>
      <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary float-end">
        Update Todo Title
      </a>
      <input
        value={todo.id}
        className="form-control w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <input
        value={todo.title}
        className="form-control w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br /><br /><hr />

      <h3>Updating Description and Completed Status</h3>
      <input
        value={todo.description}
        className="form-control w-50 float-start me-2"
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <a
        id="wd-update-description"
        className="btn btn-primary float-end"
        onClick={handleUpdateDescription}
        href="#"
      >
        Update Description
      </a>
      <br /><br />
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
      <a
        id="wd-update-completed"
        className="btn btn-primary float-end"
        onClick={handleUpdateCompleted}
        href="#"
      >
        Update Completed Status
      </a>
      <hr />

      <h3>Deleting from an Array</h3>
      <a
        id="wd-delete-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/delete`}
      >
        Delete Todo with ID = {todo.id}{" "}
      </a>
      <input
        value={todo.id}
        className="form-control w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

    </div>
  );
}


// import React, { useState } from "react";

// const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

// export default function WorkingWithArrays() {
//   const API = `${REMOTE_SERVER}/lab5/todos`;
//   const [todo, setTodo] = useState({
//     id: "1",
//     title: "NodeJS Assignment",
//     description: "Create a NodeJS server with ExpressJS",
//     due: "2021-09-09",
//     completed: false,
//   });


//   return (
//     <div id="wd-working-with-arrays">
//       <h3>Working with Arrays</h3>
//       <h4>Retrieving Arrays</h4>
//       <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
//         Get Todos{" "}
//       </a>
//       <hr />
//       <h4>Retrieving an Item from an Array by ID</h4>
//       <a
//         id="wd-retrieve-todo-by-id"
//         className="btn btn-primary float-end"
//         href={`${API}/${todo.id}`}
//       >
//         Get Todo by ID
//       </a>
//       <h3>Filtering Array Items</h3>
//       <a
//         id="wd-retrieve-completed-todos"
//         className="btn btn-primary"
//         href={`${API}?completed=true`}
//       >
//         Get Completed Todos
//       </a>
//       <hr />

//       <input
//         id="wd-todo-id"
//         value={todo.id}
//         className="form-control w-50"
//         onChange={(e) => setTodo({ ...todo, id: e.target.value })}
//       />
//       <hr />

//       <h3>Creating new Items in an Array</h3>
//       <a
//         id="wd-retrieve-completed-todos"
//         className="btn btn-primary"
//         href={`${API}/create`}
//       >
//         Create Todo
//       </a>
//       <hr />

//       <h3>Updating an Item in an Array</h3>
//       <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary float-end">
//         Update Todo</a>
//       <input value={todo.id} className="form-control w-25 float-start me-2"
//         onChange={(e) => setTodo({ ...todo, id: e.target.value })}/>
//       <input value={todo.title} className="form-control w-50 float-start"
//              onChange={(e) => setTodo({ ...todo, title: e.target.value }) }/>
//       <br /><br /><hr />

//       <h3>Deleting from an Array</h3>
//       <a
//         id="wd-retrieve-completed-todos"
//         className="btn btn-primary float-end"
//         href={`${API}/${todo.id}/delete`}
//       >
//         Delete Todo with ID = {todo.id}{" "}
//       </a>
//       <input
//         value={todo.id}
//         className="form-control w-50"
//         onChange={(e) => setTodo({ ...todo, id: e.target.value })}
//       />
//       <hr />

//       <hr />
//     </div>
//   );
// }
