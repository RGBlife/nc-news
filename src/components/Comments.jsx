import { timeDiffToCurrentDate } from "../utils/utils";
import { AnimatePresence, motion } from "framer-motion";

const Comments = ({ comments }) => {
  const noCommentMsg = <h1 className="h-10 flex items-center justify-center border-2 border-solid m-2">No comment here yet! Be the first one!</h1>;

  console.log(comments);
  return (
    <>
      {comments.length === 0 ? (
        noCommentMsg
      ) : (
        <AnimatePresence mode="sync" initial={false}>
          {comments.map((comment) => {
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={comment.comment_id}
              >
                <div className="py-4 px-2 flex flex-col border-solid rounded-md border-[1px] border-sky-500 m-2">
                  <div>
                    <img
                      alt="Placeholder Avatar"
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}
    </>
  );
};

export default Comments;
