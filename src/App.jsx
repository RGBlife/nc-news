import "./App.css";
import Header from "./layouts/Header";
import ArticlesPage from "./Pages/ArticlesPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ArticlePage from "./Pages/ArticlePage";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [loaded, setLoaded] = useState(false)
  // Will use below in next tasks
  // const [error, setError] = useState(null)

  return (
    <main className="mt-[80px]">
      <Header/>
      <Routes>
        <Route path="/" element={<ArticlesPage/>} />
        <Route path="/articles/:article_id" element={<ArticlePage/>}></Route>
        <Route path="/articles/:topic_slug" element={<ArticlesPage />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
