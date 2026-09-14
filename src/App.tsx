import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Presentation } from "./presentation/Presentation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Presentation />} />
        <Route path="/defense" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
