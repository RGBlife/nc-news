import { getArticles } from "../apis/api";
import { useState, useEffect } from "react";
import { isScrolledToBottom } from "../utils/utils";
import ArticleCard from "../components/ArticleCard";
import { useSearchParams } from "react-router-dom";

const ArticlesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articlesList, setArticlesList] = useState([]);
  const [page, setPage] = useState(1);
  const [endOfList, setEndOfList] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  let topic = searchParams.get("topic");

  useEffect(() => {
    setArticlesList([]);
    setEndOfList(false);
    setPage(1);
  }, [topic]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticles = async () => {
      if (endOfList) return;
      setIsLoading(true);

      try {
        const response = await getArticles(
          page,
          controller.signal,
          topic || ""
        );
        if (response.length === 0) setEndOfList(true);
        setArticlesList((prevArticles) => [...prevArticles, ...response]);
        setIsError(false);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();

    return () => {
      controller.abort();
    };
  }, [page, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isLoading && isScrolledToBottom()) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  if (isLoading && articlesList.length === 0) return <h1>Loading</h1>;
  if (isError)
    return (
      <h1>Error with fetching Articles, please try again later. {isError}</h1>
    );

  return (
    <div className="flex flex-col gap-3 items-center">
      {articlesList.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </div>
  );
};

export default ArticlesPage;
