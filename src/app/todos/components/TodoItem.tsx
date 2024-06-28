import React, { ReactNode } from "react";
import { Todo } from "../todo.interface";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div
      key={todo.id}
      className=" relative border border-zinc-300 p-4 w-full rounded-lg "
    >
      <div className="relative flex flex-row justify-end -mt-2">
        <button
          className="relative z-10"
          onClick={(e) => {
            e.preventDefault();
            alert("button");
          }}
        >
          X
        </button>
      </div>
      <div className="cursor-pointer" onClick={() => alert("click")}>
        <div className="font-bold text-3xl">{todo.title}</div>
        <div className=" flex flex-row gap-x-2">
          <div>{todo.description}</div>
        </div>
        <div className=" text-sm text-right text-gray-500 font-bold">
          {(todo.date || todo.created_at || "") as ReactNode}
        </div>
      </div>
    </div>
  );
}
