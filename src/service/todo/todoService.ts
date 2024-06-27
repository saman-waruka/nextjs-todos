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
    return this.http.get<GetAllTodoResponse>(
      "/todo",
      undefined,
      { baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT },
      true
    );
  }

  async create(data: Todo) {
    return this.http.post<PostCreateTodoResponse>(
      "/todo",
      data,
      undefined,
      true
    );
  }
}
