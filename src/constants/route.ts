export const ROUTE = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  TODO: "/todos",
  TODO_TABLE: "/todos/table-view",
  TODO_DETAIL: (id: string) => `/todos/${id}`,
};
