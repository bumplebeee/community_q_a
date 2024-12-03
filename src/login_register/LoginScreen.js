  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import "./util.css";
  import "./main.css";
  import { Link } from "react-router-dom";

  const LoginScreen = ({ onLogin }) => {
    // Nhận props onLogin từ App.js
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        // Fetch dữ liệu từ file database.json
        const response = await fetch("/database.json");
        if (!response.ok) {
          throw new Error("Failed to load data");
        }

        const data = await response.json(); // Parse dữ liệu JSON

        // Kiểm tra thông tin người dùng
        const user = data.users.find((user) => user.username === username);
        if (user && user.passwordHash === password) {
          onLogin({
            username: user.username,
            email: user.email,
            joinDate: user.joinDate,
          }); // Gửi tên người dùng lên App.js khi đăng nhập thành công
          navigate("/home");
        } else {
          setError(
            <p
              style={{
                fontFamily: "Ubuntu, sans-serif",
                marginBottom: "10px",
                textAlign: "center",
                color: "red",
                fontSize: "16px",
              }}
            >
              Incorrect account or password!
            </p>
          );
        }
      } catch (error) {
        setError(
          <p
            style={{
              fontFamily: "Ubuntu, sans-serif",
              marginBottom: "10px",
              textAlign: "center",
              color: "red",
              fontSize: "16px",
            }}
          >
            Something went wrong!
          </p>
        );
      }
    };

    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-t-30 p-b-50">
            <span
              className="login100-form-title p-b-41"
              style={{ fontWeight: "bold", fontFamily: "Ubuntu, sans-serif" }}
            >
              Account Login
            </span>
            <form
              className="login100-form validate-form p-b-33 p-t-5"
              onSubmit={handleLogin}
            >
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="User name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ fontFamily: "Ubuntu, sans-serif" }}
                />
                <span
                  className="focus-input100"
                  data-placeholder="&#xe82a;"
                ></span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ fontFamily: "Ubuntu, sans-serif" }}
                />
                <span
                  className="focus-input100"
                  data-placeholder="&#xe80f;"
                ></span>
              </div>

              {error && (
                <div
                  style={{
                    color: "red",
                    fontFamily: "Ubuntu, sans-serif",
                    marginBottom: "10px",
                  }}
                >
                  {error}
                </div>
              )}

              <div className="container-login100-form-btn m-t-32">
                <button
                  type="submit"
                  className="login100-form-btn"
                  style={{ fontFamily: "Ubuntu, sans-serif" }}
                >
                  Login
                </button>
              </div>

              <div className="text-center p-t-20">
                <Link
                  to="/forgot-password"
                  className="txt1"
                  style={{
                    fontFamily: "Ubuntu, sans-serif",
                    display: "block",
                    marginBottom: "10px",
                    color: "#d41872",
                  }}
                >
                  Forgot Password?
                </Link>
                <p>
                  Don’t have an account?
                  <Link
                    to="/sign-up"
                    className="txt1"
                    style={{ fontFamily: "Ubuntu, sans-serif", color: "#d41872" }}
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default LoginScreen;
