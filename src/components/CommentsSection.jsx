import { getCommentsByArticleId } from "../apis/api";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import CommentAdder from "./CommentAdder";
import { postCommentByArticleId } from "../apis/api";
import Error from "./Error";

const CommentsSection = ({ article_id, user, setCommentsAmount }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [postError, setPostError] = useState(null);
  const [refreshComments, setRefreshComments] = useState(false);

  const triggerRefresh = () => {
    setRefreshComments((toggle) => {
      return !toggle;
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchComments = async () => {
      setIsLoading(true);

      try {
        const response = await getCommentsByArticleId(
          article_id,
          controller.signal
        );
        setComments(response);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setFetchError("Failed to fetch comments.");
          setIsLoading(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();

    return () => {
      controller.abort();
    };
  }, [refreshComments]);

  useEffect(() => {
    setPostError(null);
    setIsLoading(true);
    if (!newComment || Object.keys(newComment).length === 0) return;

    const updateCommentByArticleId = async () => {
      setIsLoading(true);
      if (!newComment || Object.keys(newComment).length === 0) return;

      try {
        const formattedComment = await postCommentByArticleId(
          article_id,
          user,
          newComment
        );
        setComments([formattedComment, ...comments]);
        setCommentsAmount((prevAmount) => {
          return Number(prevAmount) + 1;
        });
      } catch (error) {
        setPostError("Failed to post comment, try again later.");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    updateCommentByArticleId();
  }, [newComment]);

  if (isLoading && comments.length === 0) return <p>Loading...</p>;
  if (fetchError && comments.length === 0)
    return <Error message={fetchError} />;

  return (
    <section className="flex flex-col">
      <CommentAdder user={user} submitLabel="Add Comment" setNewComment={setNewComment} />
      <div>
        {isLoading ? <p>Loading...</p> : null}
        {postError && !fetchError ? <Error message={postError} /> : null}
        <Comments comments={comments} triggerRefresh={triggerRefresh} />
      </div>
    </section>
  );
};

export default CommentsSection;
