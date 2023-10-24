import { getArticles } from "../apis/api";
import { useState, useEffect } from "react";
import { isScrolledToBottom } from "../utils/utils";
import ArticleCard from "../components/ArticleCard";

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

  if (isLoading && articlesList.length === 0) return <p>Loading</p>;

  return (
    <>
      {articlesList.map((article) => {
        return (
          <ArticleCard key={article.article_id} article={article}/>
        );
      })}
    </>
  );
};

export default ArticlesPage;
