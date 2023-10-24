import { getArticles } from "../apis/api";
import { useState, useEffect } from "react";
import { isScrolledToBottom } from "../utils/utils";
import { timeDiffToCurrentDate } from "../utils/utils";
import { Link } from "react-router-dom";

const ArticlesPage = ({ isLoading, setIsLoading }) => {
  const [articlesList, setArticlesList] = useState([]);
  const [page, setPage] = useState(1);
  const [endOfList, setEndOfList] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticles = async () => {
      if (endOfList) return;
      setIsLoading(true);

      try {
        const response = await getArticles(page, controller.signal);
        if (response.length === 0) setEndOfList(true);
        setArticlesList((prevArticles) => [...prevArticles, ...response]);
      } catch (error) {
        //noop
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();

    return () => {
      controller.abort();
    };
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolledToBottom()) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading && articlesList.length === 0) return <p>Loading</p>;

  return (
    <>
      {articlesList.map((article) => {
        return (
          <Link key={article.article_id} to={`/articles/${article.article_id}`}>
            <section className="flex flex-col my-2 lg:m-16">
              <div className="flex justify-center items-center rounded border-solid border-2  border-[#E0E0E0] min-height: [50vh]  lg:m-8">
                <div className="flex flex-col flex-none">
                  <p className="text-14">Votes {article.votes}</p>
                </div>
                <div className="flex-auto flex-col">
                  <div className="flex items-center flex-row justify-evenly mb-4">
                    <p className="m-2 text-14">Posted by {article.author}</p>
                    <h2 className="text-20 font-bold">{article.topic}</h2>
                    <p className="m-2 text-14">
                      Created{" "}
                      {`${timeDiffToCurrentDate(article.created_at)} ago`}
                    </p>
                  </div>
                  <div className="flex items-center flex-col">
                    <h3 className="text-18 font-semibold mb-4">
                      Title {article.title}
                    </h3>
                  </div>
                  <div className="flex max-w-xs max-h-xs">
                    <img
                      className="self-center"
                      src={article.article_img_url}
                      alt={article.title}
                    ></img>
                  </div>
                  <div className="mt-4">
                    <p className="text-14">Comments {article.comment_count}</p>
                  </div>
                </div>
              </div>
            </section>
          </Link>
        );
      })}
    </>
  );
};

export default ArticlesPage;
