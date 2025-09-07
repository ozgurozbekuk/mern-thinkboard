import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router";
import CreatePage from "./pages/CreatePage";
import NoteDetail from "./pages/NoteDetail";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
