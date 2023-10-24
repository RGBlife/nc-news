import "./App.css";
import Header from "./layouts/Header";
import ArticlesPage from "./Pages/ArticlesPage";
import NotFoundPage from "./Pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  // Will use below in next tasks
  // const [isLoading, setIsLoading] = useState(true)
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
