import { getCommentsByArticleId } from "../apis/api";
import { useState, useEffect } from "react";

const CommentsSection = ({ currentUserId, article_id}) => {
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    const controller = new AbortController();

    const fetchComments = async () => {
      setLoaded(false);

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
        setLoaded(true);
      }
    };
    fetchComments();
    return () => {
      controller.abort();
    };
  }, []);

  if (!loaded) return <p>Loading</p>;
  return (
    <section>
      <p>CommentsSection</p>
    </section>
  );
};

export default CommentsSection;
