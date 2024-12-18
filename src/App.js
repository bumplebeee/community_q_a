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
import QuestionDetail from "./view/QuestionDetail";
import MyPost from "./view/MyPost";
import EditPost from "./view/EditPost";

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
  const navigate = useNavigate();

  const handleLogin = ({ id, username }) => {
    setUser({ id, username });
    localStorage.setItem("userId", id);
    navigate("/home");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedProfile,
    }));
    localStorage.setItem("userId", updatedProfile.id); // Update localStorage after profile update
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      fetch("/database.json")
        .then((response) => response.json())
        .then((data) => {
          const user = data.users.find((u) => u.id === storedUserId);
          if (user) {
            setUser(user);
          }
        })
        .catch((error) => console.error("Error loading user data:", error));
    }

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

      {/* Trang Home */}
      <Route
        path="/home"
        element={
          <MainLayout user={user} onLogout={handleLogout}>
            <Home />
          </MainLayout>
        }
      />

      {/* Trang Questions */}
      <Route
        path="/questions"
        element={
          <MainLayout user={user} onLogout={handleLogout}>
            <Questions questions={questions} />
          </MainLayout>
        }
      />

      {/* Trang Tags */}
      <Route
        path="/tags"
        element={
          <MainLayout user={user} onLogout={handleLogout}>
            <Tags />
          </MainLayout>
        }
      />

      {/* Trang Users */}
      <Route
        path="/users"
        element={
          <MainLayout user={user} onLogout={handleLogout}>
            <Users users={users} />
          </MainLayout>
        }
      />

      {/* Trang AddPost */}
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

      {/* Trang EditProfile */}
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

      {/* Trang QuestionDeatail */}
      <Route
        path="/question/:id"
        element={
          <MainLayout user={user} onLogout={handleLogout}>
            <QuestionDetail
              questions={questions}
              answers={answers}
              users={users}
            />
          </MainLayout>
        }
      />

      {/* Trang MyPost */}
      <Route
        path="/my-post"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <MyPost user={user} questions={questions} />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* Trang Edit Post */}
      <Route
        path="/editPost/:id"
        element={
          user ? (
            <MainLayout user={user} onLogout={handleLogout}>
              <EditPost user={user} questions={questions} />
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
