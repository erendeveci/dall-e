import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

//Pages Components
import { Home, CreatePost } from "./pages";
import { logo } from "./assets";
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full  flex justify-between items-center border-b border-b-[#e6ebf4] bg-white sm:px-8 px-4 py-4 ">
        <Link to="/">
          <img src={logo} className="w-28" alt="logo" />
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium text-[14px] bg-blackColor px-4 py-2 text-white rounded-md
          hover:bg-slate-200 hover:text-black transition duration-700
          "
        >
          Create
        </Link>
      </header>

      <main className="w-full  sm:p-8 px-4 py-8 bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
