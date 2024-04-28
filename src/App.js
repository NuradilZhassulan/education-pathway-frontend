import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import UserPage from "./pages/user/UserPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/user/*" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
