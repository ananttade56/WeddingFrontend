import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import PendingPage from "./Pages/PendingPage";
import Home from "./Pages/Home";
import AdminApproval from "./Pages/AdminApproval";

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pending" element={<PendingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminApproval />} />
      </Routes>
  );
}

export default App;