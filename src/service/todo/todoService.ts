import { log } from "console";
import { BaseService } from "../base/baseService";
import {
  GetAllTodoResponse,
  PostCreateTodoResponse,
} from "./todoService.interface";
import { Todo } from "@/app/todos/todo.interface";

export class TodoService extends BaseService {
  constructor() {
    super();
  }

  async getAll() {
    return this.http.get<GetAllTodoResponse>("/todo", null, true);
  }

  async create(data: Todo) {
    return this.http.post<PostCreateTodoResponse>("/todo", data, true);
  }

  async delete(id: string) {
    return this.http.delete(`/todo/${id}`, null, true);
  }

  async update(id: string, data: Partial<Todo>) {
    return this.http.put(`/todo/${id}`, data, true);
  }
}
