import { getArticles } from "../apis/api";
import { useState, useEffect, useRef } from "react";
import { isScrolledToBottom } from "../utils/utils";

const ArticlesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
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

  // Used for console.logs, remove once happy
  useEffect(() => {
    console.log("useEffect log", articlesList);
  }, [articlesList]);

  if (isLoading && articlesList.length === 0) return <p>Loading</p>;

  return (
    <>
      {articlesList.map((article) => {
        return (
          <div
            key={article.title}
            className="flex justify-center items-center rounded border-solid border-2  border-[#E0E0E0] min-height: [50vh]  lg:m-8"
          >
            <div className="flex flex-col flex-none">
              <p>Votes {article.votes}</p>
            </div>
            <div className="flex-auto flex-col">
              <div className="flex items-center flex-row justify-evenly">
                <p>Posted by {article.author}</p>
                <p>Topic {article.topic}</p>
                <p>Created {article.created_at}</p>
              </div>
              <div className="flex items-center flex-col">
                <p>Title {article.title}</p>
              </div>
              <div className="flex max-w-xs max-h-xs">
                <img
                  className="self-center"
                  src={article.article_img_url}
                  alt={article.title}
                ></img>
              </div>
              <p>Comments {article.comment_count}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ArticlesPage;
