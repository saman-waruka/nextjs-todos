"use client";

import React, { useCallback, useEffect, useState } from "react";
import CreateTodoModal from "./components/CreateTodoModal";
import { TodoService } from "@/service/todo/todoService";
import TodoListContainer from "./components/TodoListContainer";
import { Todo } from "./todo.interface";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lastFetch, setLastFetch] = useState<number>(0);

  const getTodos = useCallback(async () => {
    try {
      const todoService = new TodoService();
      const response = await todoService.getAll();
      setTodos(response.data.data || []);
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos, lastFetch]);

  const onCreateSuccess = useCallback(() => {
    setLastFetch(new Date().getTime());
  }, []);

  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-center items-center p-4">
      <div className="p-5 font-bold text-2xl">Todos</div>
      <TodoListContainer />
      <CreateTodoModal onCreateSuccess={onCreateSuccess} />
    </div>
  );
}
