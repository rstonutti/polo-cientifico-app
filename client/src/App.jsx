import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Home />
      {/* <Login /> */}
    </div>
  );
}

export default App;
