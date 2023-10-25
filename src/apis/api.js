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
    const {
      data: { articleComments },
    } = await request.get(`articles/${id}/comments`, { signal: signal });
    return articleComments;
  },

  patchArticleById: async (vote, id) => {
    const {
      data: { patchedArticle },
    } = await request.patch(`articles/${id}`, { inc_votes: vote });
    return patchedArticle;
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

const {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  patchArticleById,
} = artificialSleep({
  getArticles: api.getArticles,
  getArticleById: api.getArticleById,
  getCommentsByArticleId: api.getCommentsByArticleId,
  patchArticleById: api.patchArticleById,
});

export {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  patchArticleById,
};
