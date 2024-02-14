import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById } from "../apis/api";
import { timeDiffToCurrentDate } from "../utils/utils";
import CommentsSection from "../components/CommentsSection";
import Voting from "../components/Voting";
import Error from "../components/Error";
import CommentsCounter from "../components/CommentsCounter";
import { useUser } from "../providers/UserContext";

const ArticlePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [commentsAmount, setCommentsAmount] = useState(0);
  const { user } = useUser();

  let username;
  if (user !== null) {
    username = user.username;
  }

  const selectedUser = username || "Login";

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticle = async () => {
      setIsLoading(true);

      try {
        const response = await getArticleById(article_id, controller.signal);
        setArticle(response);
        setCommentsAmount(response.comment_count);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading || article.votes === undefined) return <h1>Loading...</h1>;
  if (isError)
    return (
      <Error message={"Error with fetching Article, please try again later."} />
    );

  return (
    <article className="flex-1 overflow-y-auto">
      <section className="flex flex-col border-solid border-2 p-4 shadow-md">
        <div className="flex justify-center text-center mb-4">
          <h2 className="capitalize text-20 font-bold">{article.topic}</h2>
        </div>
        <div className="flex flex-row mb-4">
          <p className="m-2 text-14">Posted by {article.author}</p>
          <p className="m-2 text-14">
            Created {`${timeDiffToCurrentDate(article.created_at)} ago`}
          </p>
        </div>
        <h3 className="text-18 font-semibold mb-4">{article.title}</h3>
        <img
          className="self-center mb-4"
          src={article.article_img_url}
          alt={article.title}
        ></img>
        <p className="text-16">{article.body}</p>
      </section>
      <section className="mt-4 flex justify-center gap-5 mb-4 border-cyan-500 border-solid border-2">
        <Voting votes={article.votes} article_id={article_id} />
        <CommentsCounter commentsAmount={commentsAmount} />
      </section>

      <CommentsSection
        article_id={article_id}
        setCommentsAmount={setCommentsAmount}
        user={selectedUser}
      />
    </article>
  );
};

export default ArticlePage;
