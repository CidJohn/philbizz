import * as yup from "yup";

const FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const formSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters long"),
  path: yup
    .string()
    .required("Path is required")
    .matches(
      /^\/[a-zA-Z0-9-_]+$/,
      "Path must start with '/' and contain only alphanumeric characters, dashes or underscores"
    ),
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
