import { getCommentsByArticleId } from "../apis/api";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentAdder from "./CommentAdder";
import { postCommentByArticleId } from "../apis/api";

const CommentsSection = ({ article_id, user }) => {
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
    return () => {
      controller.abort();
    };
  }, []);

  const addComment = (text) => {
    console.log(text);

    postCommentByArticleId(article_id, user, text)
      .then((data) => {
        console.log(data);
      })
      .catch(() => {});
  };

  if (isLoading) return <p>Loading</p>;
  return (
    <section className="flex flex-col">
      <CommentAdder submitLabel="Write" handleSubmit={addComment} />
      {comments.map((comment) => {
        return <Comment key={comment.comment_id} comment={comment} />;
      })}
    </section>
  );
};

export default CommentsSection;
