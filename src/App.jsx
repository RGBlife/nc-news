import "./App.css";
import Header from "./components/Header";
import ArticlesPage from "./components/ArticlesPage";
import NotFoundPage from "./components/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState(null)
  return (
    <main>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <section className="flex flex-col my-2 lg:m-16">
              <ArticlesPage/>
            </section>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
