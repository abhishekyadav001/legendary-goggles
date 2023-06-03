import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";

import PrivateRoute from "../Components/PrivateRoute";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default MainRoutes;
