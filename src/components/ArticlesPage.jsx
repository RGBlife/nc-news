import * as api from "../apis/api";
import { useState, useEffect } from "react";

const ArticlesPage = () => {
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await api.getArticles();
      setArticlesList(response);
    };
    fetchArticles();
  }, []);

  // Used for console.logs, remove once happy
  useEffect(() => {
    console.log(articlesList, "useEffect log");
  }, [articlesList]);

  return (
    <>
      {articlesList.map((article) => {
        return (
          <div key={article.created_at} className="flex justify-center items-center rounded border-solid border-2 border-sky-500">
            <p>{article.author}</p>
            <p>{article.title}</p>
            <p>{article.topic}</p>
            <p>{article.created_at}</p>
            <p>{article.votes}</p>
            <img className="self-center" src={article.article_img_url} alt={article.title}></img>
            <p>{article.comment_count}</p>
          </div>
        );
      })}
    </>
  );
};

export default ArticlesPage;

// Description
// Users should be able to:

// see a list of all articles.
// Things to consider:

// What is an individual article card going to look like?
// How can you display the information in an engaging and accessible way?
// How are you going to arrange the articles on the screen?
// How will this view change with screens of different sizes?
