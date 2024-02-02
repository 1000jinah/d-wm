import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Calculate from "screens/calculate";
import Survey from "screens/survey";
import Result from "screens/result";
import React from "react";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/calculate" replace />} />
          <Route path="/calculate" element={<Calculate />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
