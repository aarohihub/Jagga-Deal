import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function adminOutLet() {
  const { currentUser } = useSelector((state) => state.user);
  const userRole = currentUser?.role;

  return userRole === "admin" ? <Outlet /> : <Navigate to="/signup" />;
}

export default adminOutLet;
