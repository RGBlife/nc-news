import { timeDiffToCurrentDate } from "../utils/utils";

const Comment = ({ comment }) => {
  return (
    <div
      className="py-4 px-2 flex flex-col border-solid rounded-md border-[1px] border-sky-500"
      
    >
      <div>
        <img
          alt={`Placeholder Avatar`}
          src="https://api.iconify.design/clarity/avatar-line.svg?color=%239ea3a8&width=24&height=24"
        />
      </div>
      <span className="flex">
        <p>{comment.author}</p>
        <p className="px-2">{`${timeDiffToCurrentDate(
          comment.created_at
        )} ago`}</p>
      </span>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
    </div>
  );
};

export default Comment;
