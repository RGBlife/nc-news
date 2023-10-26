import { useState } from "react";

const CommentAdder = ({ setNewComment, submitLabel }) => {
  const [commentInput, setCommentInput] = useState("");
  const isTextareaDisabled = commentInput.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    setNewComment(commentInput);
    setCommentInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit(event);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col m-[6px] rounded-sm">
      <textarea
        placeholder="Write your comment here..."
        className="placeholder:italic placeholder:text-slate-400 p-1"
        value={commentInput}
        onChange={(event) => {
          setCommentInput(event.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <button
        className="hover:bg-violet-300 block w-full text-sm text-slate-500"
        disabled={isTextareaDisabled}
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default CommentAdder;
