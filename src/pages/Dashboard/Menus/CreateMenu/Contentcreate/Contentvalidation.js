import * as yup from "yup";

export const formSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),
  address: yup
    .string()
    .required("Address is required")
    .max(200, "Address must be at most 200 characters"),
  description: yup.string().required("Description is required"),
  contact: yup
    .number()
    .typeError("Contact must be a number")
    .required("Contact is required")
    .positive("Contact must be a positive number")
    .integer("Contact must be an integer"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
