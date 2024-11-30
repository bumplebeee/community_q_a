import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./login_register/LoginScreen";
import ForgotPassword from "./login_register/ForgotPassword";
import Register from "./login_register/Register";
import AddPost from "./login_register/AddPost";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
