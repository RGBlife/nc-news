import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById } from "../apis/api";
import { timeDiffToCurrentDate } from "../utils/utils";
import Footer from "../layouts/Footer";

const ArticlePage = ({ isLoading, setIsLoading }) => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticle = async () => {
      setIsLoading(true);

      try {
        const response = await getArticleById(article_id, controller.signal);
        setArticle(response);
      } catch (error) {
        console.log("error at api request", error);
        //noop
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) return <p>Loading</p>;

  return (
    <section className="flex-1 m-auto mb-16">
      <div className="flex flex-col border-solid border-2 p-4">
        <div className="flex justify-center text-center mb-4">
          <h2 className="text-20 font-bold">{article.topic}</h2>
        </div>
        <div className="flex flex-row mb-4">
          <p className="m-2 text-14">Posted by {article.author}</p>
          <p className="m-2 text-14">Created {`${timeDiffToCurrentDate(article.created_at)} ago`}</p>
        </div>
        <h3 className="text-18 font-semibold mb-4">{article.title}</h3>
        <img
          className="self-center mb-4"
          src={article.article_img_url}
          alt={article.title}
        ></img>
        <p className="text-16">{article.body}</p>
      </div>
      <div className="mt-4 border-cyan-500 border-solid border-2" >
        <p className="text-14">{article.votes}</p>
        <p className="text-14">{article.comment_count}</p>
      </div>
      <Footer/>
    </section>
  );
};

export default ArticlePage;