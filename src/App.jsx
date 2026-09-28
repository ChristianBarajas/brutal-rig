import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyRigs from "./pages/MyRigs";
import RigBuilder from "./pages/RigBuilder";
import SavedRig from "./pages/SavedRig";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<RigBuilder />} />
        <Route path="/my-rigs" element={<MyRigs />} />
        <Route path="/my-rigs/:rigId" element={<SavedRig />} />
      </Routes>
    </BrowserRouter>
  );
}
