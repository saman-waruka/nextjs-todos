import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Required").min(1, "Too Short!"),
  password: Yup.string().required("Required").min(1, "Too Short!"),
});

export const registerSchema = Yup.object().shape({
  username: Yup.string().required("Required").min(1, "Too Short!"),
  password: Yup.string().required("Required").min(1, "Too Short!"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});
