import * as yup from "yup";

export const replySchema = yup.object({
  reply: yup.string().required("Reply is required").getDefault(""),
});
