import React from "react";
import { Todo } from "../todo.interface";

interface TodoListContainerProps {
  todos: Todo[];
}

export default function TodoListContainer({ todos }: TodoListContainerProps) {
  return <div>TodoListContainer</div>;
}
