import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .trim()
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .trim()
    .min(8, "Password must be at least 8 characters long"),
});
