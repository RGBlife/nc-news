import "./App.css";
import Header from "./layouts/Header";
import ArticlesPage from "./Pages/ArticlesPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ArticlePage from "./Pages/ArticlePage";
import LoginPage from "./Pages/LoginPage";
import { Route, Routes } from "react-router-dom";


function App() {

  return (
    <main className="mt-[80px] flex flex-col justify-center items-center">
      <Header/>
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
        <Route path="/articles" element={<ArticlesPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;

