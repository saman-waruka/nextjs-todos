import React from "react";
import { TodoService } from "@/service/todo/todoService";

type TodoRecord = Record<string, string | number>;

const ConfigOptions = {
  columns: [
    {
      key: "id",
      name: "",
    },
    {
      key: "no",
      name: "No.",
    },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "date",
      name: "Created Date",
    },
  ],
  data: [
    {
      id: "f22ecad5-cbb6-402b-995f-6867792bc9c6",
      no: 1,
      title: "Job 1",
      description: "This is job 1",
      date: "1 Oct 2023 12:03:48",
    },
    {
      id: "f22ecad5-cbb6-402b-995f-6867792bc9c7",
      no: 2,
      title: "Job 2",
      description: "This is job 2",
      date: "1 Oct 2023 12:03:48",
    },
    {
      id: "f22ecad5-cbb6-402b-995f-6867792bc9c8",
      no: 3,
      title: "Job 3",
      description: "This is job 3",
      date: "1 Oct 2023 12:03:48",
    },
  ],
};

export default async function TodoTablePage() {
  // NOTE: Mock table config
  const { data: mockData, columns } = ConfigOptions;
  const todoService = new TodoService();
  const response = await todoService.getAll();
  const todos = (response.data.data || mockData) as TodoRecord[];

  if (!todos.length) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        No data to show.
      </div>
    );
  }

  return (
    <div className="flex justify-center mx-auto">
      <table className="mt-3 ">
        <caption className=" text-2xl font-bold py-3 mb-5">
          Todo in table view with custom column (Full Server-Side Render)
        </caption>
        <thead>
          <tr className="bg-slate-400">
            {columns.map((col) => (
              <th key={`head-col-${col.key}`}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} className="odd:bg-slate-200 even:bg-slate-100">
              {columns.map((col) => (
                <td
                  key={`${todo.id}-col-${col.key}`}
                  className="py-2 px-2 odd:bg-opacity-0"
                >
                  {todo[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
