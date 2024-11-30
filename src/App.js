import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./login_register/LoginScreen";
import ForgotPassword from "./login_register/ForgotPassword";
import Register from "./login_register/Register";
import AddPost from "./login_register/AddPost";
import Navbar from "./view/Navbar";
import Sidebar from "./view/Sidebar";
import Home from "./view/Home";
import Questions from "./view/Questions";
import Tags from "./view/Tags";
import Users from "./view/Users";
import Footer from "./view/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

// Layout for pages after login
const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <main style={{ flex: 1, padding: "20px" }}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<Register />} />
        
        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/questions"
          element={
            <MainLayout>
              <Questions />
            </MainLayout>
          }
        />
        <Route
          path="/tags"
          element={
            <MainLayout>
              <Tags />
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout>
              <Users />
            </MainLayout>
          }
        />
        <Route
          path="/add-post"
          element={
            <MainLayout>
              <AddPost />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
