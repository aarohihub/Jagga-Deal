import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function userOutLet() {
  const { currentUser } = useSelector((state) => state.user);
  const userRole = currentUser?.role;

  return userRole === "user" ? <Outlet /> : <Navigate to="/unauthorized" />;
}

export default userOutLet;
