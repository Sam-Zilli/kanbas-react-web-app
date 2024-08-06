import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";


// Define a TypeScript interface for a Todo item
interface Todo {
  id: number;
  title: string;
}

// Define a TypeScript interface for the component props
interface TodoItemProps {
  todo: Todo;
}


// export default function TodoItem({ todo }) {
export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item">
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
      >
        {" "}
        Delete{" "}
      </button>
      <button onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click">
        {" "}
        Edit{" "}
      </button>
      {todo.title}
    </li>
  );
}
