import React, { ReactNode } from "react";
import { Todo } from "../todo.interface";
import TodoItem from "./TodoItem";

interface TodoListContainerProps {
  todos: Todo[];
}

export default function TodoListContainer({ todos }: TodoListContainerProps) {
  return (
    <div className="flex flex-col w-2/3 gap-y-3">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
}
