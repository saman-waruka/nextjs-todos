import { Todo } from "@/app/todos/todo.interface";

export interface GetAllTodoResponse {
  isSuccess: boolean;
  data: Todo[] | null;
}

export interface PostCreateTodoResponse {
  isSuccess: boolean;
  data: Todo;
}
