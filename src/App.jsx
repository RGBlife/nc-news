import "./App.css";
import Header from "./layouts/Header";
import ArticlesPage from "./Pages/ArticlesPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ArticlePage from "./Pages/ArticlePage";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  // Will use below in next tasks
  const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState(null)

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesPage isLoading={isLoading} setIsLoading={setIsLoading}/>} />
        <Route path="/articles/:article_id" element={<ArticlePage isLoading={isLoading} setIsLoading={setIsLoading}/>}></Route>
        <Route path="/articles/:topic_slug" element={<ArticlesPage />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
