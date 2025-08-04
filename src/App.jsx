import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "../src/index.css";

function App() {
  return (
    <div>
      <Header />
      <main className="w-[80%] mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App; // ✅ Đừng quên dòng này!
