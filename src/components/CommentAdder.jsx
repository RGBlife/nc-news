import { useState } from "react";
import { Link } from "react-router-dom";

const CommentAdder = ({ setNewComment, submitLabel, user }) => {
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

  if (user === "Login") {
    return (
      <p className="text-center text-slate-500">
        Please{" "}
        <Link className="text-[#D83367]" to="/login">
          log in {" "}
        </Link>
        to leave a comment.
      </p>
    );
  }

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
        className="hover:bg-violet-300 bg-[#efefed] block w-full text-sm text-slate-500"
        disabled={isTextareaDisabled}
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default CommentAdder;
