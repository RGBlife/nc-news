import axios from "axios";

const request = axios.create({
  baseURL: "https://article-hub-api.onrender.com/api",
});

const api = {
  getArticles: async (page = 1, signal) => {
    const {
      data: { articles },
    } = await request.get(`articles?p=${page}`, { signal: signal });

    return articles;
  },

  getArticleById: async (id, signal) => {
    const {
      data: { article },
    } = await request.get(`articles/${id}`, { signal: signal });

    return article;
  },

  getCommentsByArticleId: async (id, signal) => {
    let {
      data: { articleComments },
    } = await request.get(`articles/${id}/comments`, { signal: signal });
    return articleComments;
  },
};

const artificialSleep = (requests) => {
  let modules = {};
  Object.entries(requests).forEach(([key, value]) => {
    modules[key] = (...args) => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() =>
          value(...args)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        );
      });

      return promise;
    };
  });

  return modules;
};

const { getArticles, getArticleById, getCommentsByArticleId } = artificialSleep(
  {
    getArticles: api.getArticles,
    getArticleById: api.getArticleById,
    getCommentsByArticleId: api.getCommentsByArticleId,
  }
);

export { getArticles, getArticleById, getCommentsByArticleId };
