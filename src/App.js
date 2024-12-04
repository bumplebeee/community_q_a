import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
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
import EditProfile from "./view/Profile";
import QuestionDetail from "./view/QuestionDetail"; // Import trang chi tiết câu hỏi

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
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [users, setUsers] = useState([]);

  const navigate = useNavigate(); // Sử dụng useNavigate

  const handleLogin = (username) => {
    setUser(username); // Lưu tên người dùng vào state
    navigate("/home"); // Chuyển hướng sang trang home
  };

  const handleLogout = () => {
    setUser(null); // Xóa thông tin người dùng
    navigate("/"); // Quay lại trang login
  };

  useEffect(() => {
    // Giả sử bạn đã lấy dữ liệu từ một API hoặc file JSON
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        setAnswers(data.answers);
        setUsers(data.users);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sign-up" element={<Register />} />
      <Route
        path="/home"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <Home />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/questions"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <Questions questions={questions} />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
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
            <Navigate to="/login" />
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
            <Navigate to="/login" />
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
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/edit-profile"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <EditProfile
                user={user}
                onProfileUpdate={(updatedProfile) => {
                  setUser(updatedProfile.username); // Cập nhật username trong state
                }}
              />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* Route cho trang chi tiết câu hỏi */}
      <Route
        path="/question/:id"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <QuestionDetail
                questions={questions}
                answers={answers}
                users={users}
              />
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
