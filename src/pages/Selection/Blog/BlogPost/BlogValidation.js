import * as yup from "yup";

const FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const formSchema = yup.object({
  title: yup
    .string()
    .required("Title is required!")
    .max(100, "Title must be at most 100 characters"),
  description: yup.string().required("Description is Required!"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "File size is too large", (value) => {
      return value && value[0] && value[0].size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported file Format", (value) => {
      return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
    }),
});
