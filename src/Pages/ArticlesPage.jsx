import { getArticles } from "../apis/api";
import { useState, useEffect } from "react";
import { isScrolledToBottom } from "../utils/utils";
import ArticleCard from "../components/ArticleCard";
import { useSearchParams } from "react-router-dom";
import FilterCard from "../components/FilterCard";
import ScrollToTop from "../layouts/ScrollToTop";

const ArticlesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articlesList, setArticlesList] = useState([]);
  const [page, setPage] = useState(1);
  const [endOfList, setEndOfList] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "created_at";
  const order = searchParams.get("order") || "desc";
  const topic = searchParams.get("topic") || "";

  useEffect(() => {
    setArticlesList([]);
    setEndOfList(false);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticles = async () => {
      if (endOfList) return;
      setIsLoading(true);

      try {
        const response = await getArticles(
          page,
          controller.signal,
          topic,
          sortBy,
          order
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

  return (
    <div className="flex flex-col gap-3 items-center">
      <FilterCard
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
      <>
        {isLoading && articlesList.length === 0 ? <h1>Loading</h1> : null}
        {isError ? (
          <h1>
            Error with fetching Articles, please try again later. {isError}
          </h1>
        ) : null}
        {articlesList.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
        <ScrollToTop /> 
      </>
    </div>
  );
};

export default ArticlesPage;
