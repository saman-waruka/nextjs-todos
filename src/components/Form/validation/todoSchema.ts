import * as Yup from "yup";

export const createTodoSchema = Yup.object().shape({
  title: Yup.string().required("Required").min(1, "Too Short!"),
  description: Yup.string().required("Required").min(1, "Too Short!"),
});
