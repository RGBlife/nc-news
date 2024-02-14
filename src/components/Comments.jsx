import { timeDiffToCurrentDate } from "../utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import DeleteComment from "./DeleteComment";
import { useState } from "react";
import { deleteCommentRequest } from "../apis/api";
import { clearStateAfterTimeout } from "../utils/utils";
import { useUser } from "../providers/UserContext";

const Comments = ({ comments, triggerRefresh }) => {
  const [deleteError, setDeleteError] = useState({});
  const [deletionInProgress, setDeletionInProgress] = useState({});
  const noCommentMsg = (
    <h1 className="h-10 flex items-center justify-center border-2 border-solid m-2">
      No comment here yet! Be the first one!
    </h1>
  );

  const handleDelete = async (commentId) => {
    setDeletionInProgress((prevState) => ({
      ...prevState,
      [commentId]: { loadingDelete: true, deleteSuccessful: false },
    }));

    try {
      const deletedComment = await deleteCommentRequest(commentId);
      setDeletionInProgress((prevState) => ({
        ...prevState,
        [commentId]: { loadingDelete: false, deleteSuccessful: true },
      }));
      triggerRefresh();
    } catch (error) {
      setDeleteError((prevState) => ({ ...prevState, [commentId]: true }));
      setDeletionInProgress((prevState) => ({
        ...prevState,
        [commentId]: { loadingDelete: false, deleteSuccessful: false },
      }));

      clearStateAfterTimeout(setDeleteError, commentId, 5000);
    }
  };

  const currentUser = useUser();

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
                <span className="flex gap-2 mb-2">
                  <div className="mb-1">
                    <img
                      alt="Placeholder Avatar"
                      src="https://api.iconify.design/clarity/avatar-line.svg?color=%239ea3a8&width=24&height=24"
                    />
                  </div>
                  
                    <p>{comment.author}</p>
                    <p className="px-2">{`${timeDiffToCurrentDate(
                      comment.created_at
                    )} ago`}</p>
                  </span>
                  <p>{comment.body}</p>
                  <ol className="flex gap-10 justify-center items-center">
                    <li className="text-[#83878c] m-2 p-2 w-auto font-semibold align-center flex flex-row justify-center border-solid border-2 border-[#d5dbe0] rounded-2xl">Votes: {comment.votes}</li>
                    {comment.author === currentUser ? (
                      <DeleteComment
                        triggerRefresh={triggerRefresh}
                        commentId={comment.comment_id}
                        deletionInProgress={
                          deletionInProgress[comment.comment_id] || {
                            loadingDelete: false,
                            deleteSuccessful: false,
                          }
                        }
                        handleDelete={() => handleDelete(comment.comment_id)}
                        setDeletionInProgress={setDeletionInProgress}
                      />
                    ) : null}
                  </ol>

                  {deleteError[comment.comment_id] ? (
                    <p className="text-red-600">
                      Error deleting comment. Please try again.
                    </p>
                  ) : null}
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
