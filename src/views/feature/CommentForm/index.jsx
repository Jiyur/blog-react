import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/Form/InputFields";
import { Button } from "@mui/material";
import "./style.scss";
import myblog from "../../model/blogModel";
import { useParams } from "react-router-dom";

function CommentForm({ onSubmit }) {
  const { id } = useParams();
  const form = useForm({
    defaultValues: {
      content: "",
    },
  });
  const handleSubmit = (values) => {
    console.log(values.content);

    if (values.content) {
      let index = myblog.findIndex((item) => item.id == id);
      let blog = myblog.find((item) => item.id == id);
      if (myblog[index].commentList == undefined) {
        myblog[index].commentList = [];
      }
      let data = {
        id: blog.commentList.length + 1,
        content: values.content,
      };

      myblog[index].commentList.push(data);
      onSubmit();
    }
    form.reset();
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="content" label="Comment here" form={form} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ m: "20px 0px 2px 0px" }}
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
  );
}

export default CommentForm;
