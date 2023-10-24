import axios from "axios";

const request = axios.create({
  baseURL: "https://article-hub-api.onrender.com/api",
});

export const getArticles = async (page = 1, signal) => {
  const {
    data: { articles },
  } = await request.get(`articles?p=${page}`, { signal: signal });

  return articles;
};

export const getArticleById = async (id, signal) => {
  const {
    data: { article },
  } = await request.get(`articles/${id}`, { signal: signal });

  return article;
};
