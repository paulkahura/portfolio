import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainContent } from "./components/MainContent";
import { EditorialPortfolio } from "./components/EditorialPortfolio";
import "./editorial.css";

export default function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const crt = window.location.pathname === `${base}/crt` || window.location.pathname.startsWith(`${base}/crt/`);
  return (
    <BrowserRouter basename={crt ? `${base}/crt` : import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={crt ? <MainContent /> : <EditorialPortfolio />} />
        <Route path="/blog/:id" element={crt ? <MainContent /> : <EditorialPortfolio />} />
        <Route path="*" element={crt ? <MainContent /> : <EditorialPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
