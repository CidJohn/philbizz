import * as yup from "yup";

const FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

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
  email: yup
    .string()
    .email("Invalid email format"),
  parent: yup.string().required("Parent Name is required"),
  child: yup.string().required("Children Name is required"),
  image: yup
    .mixed()
    .required("An image is required")
    .test("fileSize", "File size is too large", (value) => {
      return value && value[0] && value[0].size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported file format", (value) => {
      return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
    }),
   
});
