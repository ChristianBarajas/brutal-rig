import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RigBuilder from "./pages/RigBuilder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<RigBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}