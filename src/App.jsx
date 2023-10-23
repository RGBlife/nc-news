import "./App.css";
import Header from "./components/Header";
import ArticlesPage from "./components/ArticlesPage";
import NotFoundPage from "./components/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <section className="m-16">
              <ArticlesPage />
            </section>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
