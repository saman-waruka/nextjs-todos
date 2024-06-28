"use client";

import React, { useCallback, useEffect, useState } from "react";
import CreateTodoModal from "./components/CreateUpdateTodoModal";
import { TodoService } from "@/service/todo/todoService";
import TodoListContainer from "./components/TodoListContainer";
import { Todo } from "./todo.interface";
import Loading from "@/components/Loading/Loading";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const getTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const todoService = new TodoService();
      const response = await todoService.getAll();
      setTodos(response.data.data || []);
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos, lastFetch]);

  const onSuccess = useCallback(() => {
    setLastFetch(new Date().getTime());
  }, []);

  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-center items-center p-4">
      <div className="p-5 font-bold text-2xl">Todos</div>
      {isLoading ? (
        <Loading />
      ) : (
        <TodoListContainer todos={todos} onSuccess={onSuccess} />
      )}
      <CreateTodoModal onSuccess={onSuccess} />
    </div>
  );
}
