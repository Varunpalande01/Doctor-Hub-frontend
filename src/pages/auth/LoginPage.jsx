

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MessageCard from "../../components/common/MessageCard";
// import "./Login.css";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [identifier, setIdentifier] = useState(""); // username or email
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!identifier) {
//       setMessage({ text: "Please enter username/email", type: "error" });
//       return;
//     }
//     if (!password) {
//       setMessage({ text: "Password cannot be empty", type: "error" });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ identifier, password }),
//       });

//       if (!response.ok) {
//         const errorMsg = await response.text();
//         setMessage({ text: errorMsg, type: "error" });
//         setLoading(false);
//         return;
//       }

//       const user = await response.json();
//       localStorage.setItem("currentUser", JSON.stringify(user));

//       setMessage({ text: `Welcome back, ${user.fullName || user.username || user.email}!`, type: "success" });

//       setTimeout(() => {
//         setLoading(false);
//         if (user.role === "ADMIN") navigate("/admin/dashboard");
//         else if (user.role === "DOCTOR") navigate("/doctor/dashboard");
//         else navigate("/patient/dashboard");
//       }, 1000);

//     } catch {
//       setMessage({ text: "Server not reachable. Try later.", type: "error" });
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-page">
//         <div className="login-left">
//           <img src="src/assets/images/userlogin.png" alt="Login" className="auth-img" />
//         </div>
//         <div className="login-right">
//           <form className="login-card" onSubmit={handleLogin}>
//             <h2>Login</h2>

//             {message && <MessageCard message={message.text} type={message.type} onClose={() => setMessage(null)} />}

//             <div className="input-field">
//               <input
//                 type="text"
//                 placeholder="Username or Email"
//                 value={identifier}
//                 onChange={(e) => setIdentifier(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="input-field">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button type="submit" className="login-btn" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>

//             <p className="forgot-pass" onClick={() => alert("Send OTP flow")}>Forgot Password?</p>
//             <p className="signup-text">
//               Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageCard from "../../components/common/MessageCard";
import "./Login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Create demo users if not already present
  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem("users"));
    if (!existingUsers) {
      const demoUsers = [
        {
          fullName: "Admin ",
          email: "admin@demo.com",
          password: "admin123",
          role: "ADMIN",
        },
        {
          fullName: "Doctor",
          email: "doctor@demo.com",
          password: "doctor123",
          role: "DOCTOR",
        },
        {
          fullName: "Patient",
          email: "patient@demo.com",
          password: "patient123",
          role: "PATIENT",
        },
      ];
      localStorage.setItem("users", JSON.stringify(demoUsers));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!identifier) {
      setMessage({ text: "Please enter username/email", type: "error" });
      return;
    }

    if (!password) {
      setMessage({ text: "Password cannot be empty", type: "error" });
      return;
    }

    setLoading(true);
    setMessage(null);

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        (u.email === identifier || u.fullName === identifier) &&
        u.password === password
    );

    if (!user) {
      setMessage({ text: "Invalid credentials", type: "error" });
      setLoading(false);
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    setMessage({
      text: `Welcome back, ${user.fullName}!`,
      type: "success",
    });

    setTimeout(() => {
      setLoading(false);
      if (user.role === "ADMIN") navigate("/admin/dashboard");
      else if (user.role === "DOCTOR") navigate("/doctor/dashboard");
      else navigate("/patient/dashboard");
    }, 1000);
  };

  return (
    <div className="login-wrapper">
      <div className="login-page">
        <div className="login-left">
          <img
            src="src/assets/images/userlogin.png"
            alt="Login"
            className="auth-img"
          />
        </div>

        <div className="login-right">
          <form className="login-card" onSubmit={handleLogin}>
            <h2>Login</h2>

            {message && (
              <MessageCard
                message={message.text}
                type={message.type}
                onClose={() => setMessage(null)}
              />
            )}

            <div className="input-field">
              <input
                type="text"
                placeholder="Username or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="forgot-pass">Demo Mode Active</p>

            <p className="signup-text">
              Don't have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
