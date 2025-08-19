import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("access_token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!token || !user) {
    // Nếu không có token hoặc user thì chuyển về trang đăng nhập
    return <Navigate to="/dang-nhap" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Nếu user không thuộc role được phép, redirect theo role
    if (user.role === "doctor") return <Navigate to="/bac-si" replace />;
    if (user.role === "patient") return <Navigate to="/" replace />;
    // Nếu role khác hoặc không hợp lệ
    return <Navigate to="/dang-nhap" replace />;
  }

  // Nếu hợp lệ, trả về nội dung con (children)
  return children;
}
