import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "../src/index.css";
function App() {
  return (
    <div
      style={{
        transform: "scale(0.8)",
        transformOrigin: "top left",
        width: "125%",
        height: "125%",
      }}
    >
      <div>
        <Header />
        <main className="w-[90%] mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default App;
