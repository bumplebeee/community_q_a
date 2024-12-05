import "./App.css";
import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom"; // Thêm Navigate để điều hướng
import LoginScreen from "./login_register/LoginScreen";
import ForgotPassword from "./login_register/ForgotPassword";
import Register from "./login_register/Register";
import AddPost from "./login_register/AddPost";
import NavbarComponent from "./view/Navbar";
import Sidebar from "./view/Sidebar";
import Home from "./view/Home";
import Questions from "./view/Questions";
import Tags from "./view/Tags";
import Users from "./view/Users";
import Footer from "./view/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProfile from "./view/Profile";

// Layout for pages after login
const MainLayout = ({ children, user, onLogout }) => {
  return (
    <>
      <NavbarComponent user={user} onLogout={onLogout} />
      <div className="d-flex">
        <Sidebar />
        <main style={{ flex: 1, padding: "20px" }}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); // Sử dụng useNavigate

  const handleLogin = ({ id,username }) => {
    setUser({ id,username }); // Lưu cả username và email
    navigate("/home");
  };
  console.log(user);

  const handleLogout = () => {
    setUser(null); // Xóa thông tin người dùng
    navigate("/"); // Quay lại trang login
  };
   const handleProfileUpdate = (updatedProfile) => {
     setUser((prevUser) => ({
       ...prevUser,
       ...updatedProfile, // Update user profile state
     }));
   };
  return (
    <Routes>
      {/* Trang mặc định là Home */}
      <Route
        path="/"
        element={<Navigate to="/home" />} // Điều hướng tới /home khi truy cập vào trang mặc định
      />

      {/* Public Routes */}
      <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sign-up" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <Home />
            </MainLayout>
          ) : (
            <Navigate to="/login" /> // Nếu chưa đăng nhập, chuyển hướng về trang login
          )
        }
      />
      <Route
        path="/questions"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <Questions />
            </MainLayout>
          ) : (
            <Navigate to="/login" /> // Nếu chưa đăng nhập, chuyển hướng về trang login
          )
        }
      />
      <Route
        path="/tags"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <Tags />
            </MainLayout>
          ) : (
            <Navigate to="/login" /> // Nếu chưa đăng nhập, chuyển hướng về trang login
          )
        }
      />
      <Route
        path="/users"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <Users />
            </MainLayout>
          ) : (
            <Navigate to="/login" /> // Nếu chưa đăng nhập, chuyển hướng về trang login
          )
        }
      />
      <Route
        path="/add-post"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <AddPost />
            </MainLayout>
          ) : (
            <Navigate to="/login" /> // Nếu chưa đăng nhập, chuyển hướng về trang login
          )
        }
      />
      <Route
        path="/edit-profile"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <EditProfile user={user} onProfileUpdate={handleProfileUpdate} />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
