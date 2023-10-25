import { useState } from "react";

const CommentAdder = ({ handleSubmit, submitLabel }) => {
  const [text, setText] = useState("");
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <textarea
      placeholder="Write your comment here..."
      className="placeholder:italic placeholder:text-slate-400"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button className="hover:bg-violet-300 block w-full text-sm text-slate-500" disabled={isTextareaDisabled}>{submitLabel}</button>
    </form>
  );
};

export default CommentAdder;
