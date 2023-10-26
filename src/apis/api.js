import axios from "axios";

const request = axios.create({
  baseURL: "https://article-hub-api.onrender.com/api",
});

const api = {
  getArticles: async (page = 1, signal, topic = "") => {
    const {
      data: { articles },
    } = await request.get(`articles?p=${page}&topic=${topic}`, {
      signal: signal,
    });
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

  postCommentByArticleId: async (id, username, body) => {
    const {
      data: { insertedComment },
    } = await request.post(`articles/${id}/comments`, {
      body,
      username,
    });
    return insertedComment;
  },

  getTopics: async () => {
    const {
      data: { topics },
    } = await request.get(`topics`);
    return topics;
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
  postCommentByArticleId,
  getTopics,
} = artificialSleep({
  getArticles: api.getArticles,
  getArticleById: api.getArticleById,
  getCommentsByArticleId: api.getCommentsByArticleId,
  patchArticleById: api.patchArticleById,
  postCommentByArticleId: api.postCommentByArticleId,
  getTopics: api.getTopics,
});

export {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  patchArticleById,
  postCommentByArticleId,
  getTopics,
};
