import { getCommentsByArticleId } from "../apis/api";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import CommentAdder from "./CommentAdder";
import { postCommentByArticleId } from "../apis/api";

const CommentsSection = ({ article_id, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({});
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

  useEffect(() => {
    if (!newComment || Object.keys(newComment).length === 0) return;

    postCommentByArticleId(article_id, user, newComment)
      .then((formattedComment) => {
        setComments([formattedComment, ...comments]);
      })
      .catch(() => {});
  }, [newComment]);

  if (isLoading) return <p>Loading...</p>;
  console.log(comments);
  return (
    <section className="flex flex-col">
      <CommentAdder submitLabel="Write" setNewComment={setNewComment} />
      <div>
      <Comments comments={comments} />
      </div>
      
    </section>
  );
};

export default CommentsSection;
