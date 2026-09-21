import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainContent } from "./components/MainContent";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/blog/:id" element={<MainContent />} />
        <Route path="*" element={<MainContent />} />
      </Routes>
    </BrowserRouter>
  );
}
