import React, { useState } from "react";
import "./util.css";
import "./main.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State lưu email nhập vào
  const [message, setMessage] = useState(""); // State hiển thị thông báo
  const [loading, setLoading] = useState(false); // Trạng thái giả lập đang gửi email

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Email is required.");
      return;
    }

    setLoading(true); // Bắt đầu giả lập gửi email

    try {
      // Gọi API để kiểm tra email
      const response = await fetch("http://localhost:9999/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const user = data.find((user) => user.email === email);

      if (user) {
        // Giả lập gửi email bằng setTimeout
        setTimeout(() => {
          setLoading(false);
          setMessage("A password reset link has been sent to your email.");
        }, 2000); // Thời gian giả lập (2 giây)
      } else {
        setLoading(false);
        setMessage("Email does not exist.");
      }
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred. Please try again.");
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
            Forgot Password
          </span>
          <form
            className="login100-form validate-form p-b-33 p-t-5"
            onSubmit={handleForgotPassword} // Thêm sự kiện onSubmit
          >
            <div
              className="wrap-input100 validate-input"
              data-validate="Enter email"
            >
              <input
                className="input100"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Cập nhật state email
                style={{ fontFamily: "Ubuntu, sans-serif" }}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xe818;"
              ></span>
            </div>

            {/* Hiển thị thông báo */}
            {message && (
              <div
                style={{
                  color: message.includes("link has been sent")
                    ? "green"
                    : "red",
                  fontFamily: "Ubuntu, sans-serif",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                {message}
              </div>
            )}

            <div className="container-login100-form-btn m-t-32">
              <button
                type="submit"
                className="login100-form-btn"
                style={{ fontFamily: "Ubuntu, sans-serif" }}
                disabled={loading} // Vô hiệu hóa nút khi đang xử lý
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>

            <div className="text-center p-t-20">
              <a
                href="/login"
                className="txt1"
                style={{ fontFamily: "Ubuntu, sans-serif", color: "#d41872" }}
              >
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
