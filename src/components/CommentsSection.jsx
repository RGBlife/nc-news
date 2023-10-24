import { getCommentsByArticleId } from "../apis/api";
import { useState, useEffect } from "react";
import { timeDiffToCurrentDate } from "../utils/utils";

const CommentsSection = ({ currentUserId, article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log("error at api request", error);
        //noop
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) return <p>Loading</p>;
  return (
    <section className="flex flex-col">
      {comments.map((comment) => {
        return (
          <div
            className="py-4 px-2 flex flex-col border-solid rounded-md border-[1px] border-sky-500"
            key={comment.comment_id}
          >
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
      })}
    </section>
  );
};

export default CommentsSection;
