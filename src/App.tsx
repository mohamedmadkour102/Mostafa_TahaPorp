import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Presentation } from "./presentation/Presentation";
import { ProposalDocument } from "./pages/ProposalDocument";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Presentation />} />
        <Route path="/proposal" element={<ProposalDocument />} />
        <Route path="/defense" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
