import { useEffect, useState } from "react";

const DeleteComment = ({ handleDelete, deletionInProgress, commentId, triggerRefresh, setDeletionInProgress }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    let timer;
    if (deletionInProgress.deleteSuccessful) {
      setShowSuccessMessage(true);
      triggerRefresh()
      timer = setTimeout(() => {
        setDeletionInProgress({
          loadingDelete: false,
          deleteSuccessful: false,
        });
        setShowSuccessMessage(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [deletionInProgress.deleteSuccessful]);

  return (
    <li>
      <button
        onClick={() => {
          handleDelete(commentId);
        }}
        className="text-rose-500 border-2 border-rose-500 rounded-md p-1"
      >
        DELETE
      </button>
      {deletionInProgress.loadingDelete ? <p>Loading...</p> : null}
      {showSuccessMessage ? <p className="text-green-600">Comment deleted successfully!</p> : null}
    </li>
  );
};

export default DeleteComment;
