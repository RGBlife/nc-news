import axios from "axios";

const request = axios.create({
  baseURL: "https://article-hub-api.onrender.com/api",
});

export const getArticles = async () => {
  try {
    const {
      data: { articles },
    } = await request.get("articles");
    console.log(articles);
    return articles;
  } catch (error) {
    console.log(error, "error at getArticles");
  }
};

