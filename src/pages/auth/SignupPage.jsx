// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Signup.css";

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [role, setRole] = useState("patient");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [specialization, setSpecialization] = useState("");
//   const [credentials, setCredentials] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const suggestionsData = {
//     specialization: ["Cardiology", "Dermatology", "Neurology", "Pediatrics", "Orthopedics", "General Physician", "Psychiatry", "Radiology", "Oncology", "Gastroenterology"],
//     credentials: ["MBBS", "MD", "MS", "BDS", "DNB", "FRCS", "PhD", "MCh"]
//   };

//   const [filteredSpecs, setFilteredSpecs] = useState([]);
//   const [filteredCreds, setFilteredCreds] = useState([]);
//   const [activeField, setActiveField] = useState(null);

//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupType, setPopupType] = useState("");

//   const handleInputChange = (value, type) => {
//     if (type === "specialization") {
//       setSpecialization(value);
//       const filtered = suggestionsData.specialization.filter(item =>
//         item.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredSpecs(value ? filtered : []);
//     } else {
//       setCredentials(value);
//       const filtered = suggestionsData.credentials.filter(item =>
//         item.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredCreds(value ? filtered : []);
//     }
//     setActiveField(type);
//   };

//   // ✅ VALIDATION FUNCTION ADDED
//   const validateForm = () => {

//     if (fullName.trim().length < 3) {
//       showPopup("Full Name must be at least 3 characters", "error");
//       return false;
//     }

//     const emailRegex = /^\S+@\S+\.\S+$/;
//     if (!emailRegex.test(email)) {
//       showPopup("Enter a valid email address", "error");
//       return false;
//     }

//     const mobileRegex = /^[0-9]{10}$/;
//     if (!mobileRegex.test(mobile)) {
//       showPopup("Mobile number must be 10 digits", "error");
//       return false;
//     }

//     if (password.length < 6) {
//       showPopup("Password must be at least 6 characters", "error");
//       return false;
//     }

//     if (password !== confirmPassword) {
//       showPopup("Passwords do not match", "error");
//       return false;
//     }

//     if (role === "doctor") {
//       if (credentials.trim() === "") {
//         showPopup("Credentials are required for doctor", "error");
//         return false;
//       }

//       if (specialization.trim() === "") {
//         showPopup("Specialization is required for doctor", "error");
//         return false;
//       }
//     }

//     return true;
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     // ✅ CALL VALIDATION HERE
//     if (!validateForm()) return;

//     const newUser = {
//       fullName,
//       email,
//       mobile,
//       password,
//       role: role.toUpperCase(),
//       specialization: role === "doctor" ? specialization : null,
//       credentials: role === "doctor" ? credentials : null,
//     };

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newUser),
//       });

//       if (!response.ok) {
//         const errorMsg = await response.text();
//         showPopup(errorMsg, "error");
//         return;
//       }

//       showPopup("Signup successful! Redirecting to login...", "success");
//       setTimeout(() => navigate("/login"), 2500);

//     } catch {
//       showPopup("Server not reachable. Try again later.", "error");
//     }
//   };

//   const showPopup = (message, type) => {
//     setPopupMessage(message);
//     setPopupType(type);
//     setTimeout(() => setPopupMessage(""), 2500);
//   };

//   return (
//     <div className="signup-wrapper">
//       <div className="signup-page">
//         <div className="signup-left">
//           <img
//             src={role === "patient" ? "src/assets/images/patientlogin.png" : "src/assets/images/doctorlogin.png"}
//             alt="Signup Illustration"
//             className="auth-img"
//           />
//         </div>

//         <div className="signup-right">
//           {popupMessage && (
//             <div className={`popup-card ${popupType}`}>
//               <p>{popupMessage}</p>
//             </div>
//           )}

//           <form className="signup-card" onSubmit={handleSignup}>
//             <h2>Sign Up</h2>

//             <p className="switch-role">
//               Are you a {role === "patient" ? "doctor" : "patient"}?{" "}
//               <span onClick={() => setRole(role === "patient" ? "doctor" : "patient")}>
//                 Register here
//               </span>
//             </p>

//             <div className="form-grid">
//               <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
//               <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//               <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} />

//               {role === "doctor" && (
//                 <>
//                   <div className="specialization-wrapper">
//                     <input
//                       type="text"
//                       placeholder="Credentials (e.g., MBBS, MD)"
//                       value={credentials}
//                       onChange={(e) => handleInputChange(e.target.value, "credentials")}
//                       onFocus={() => setActiveField("credentials")}
//                     />
//                     {activeField === "credentials" && filteredCreds.length > 0 && (
//                       <ul className="suggestions-list">
//                         {filteredCreds.map((item, idx) => (
//                           <li key={idx} onClick={() => { setCredentials(item); setActiveField(null); }}>
//                             {item}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>

//                   <div className="specialization-wrapper">
//                     <input
//                       type="text"
//                       placeholder="Specialization (e.g., Cardiology)"
//                       value={specialization}
//                       onChange={(e) => handleInputChange(e.target.value, "specialization")}
//                       onFocus={() => setActiveField("specialization")}
//                     />
//                     {activeField === "specialization" && filteredSpecs.length > 0 && (
//                       <ul className="suggestions-list">
//                         {filteredSpecs.map((item, idx) => (
//                           <li key={idx} onClick={() => { setSpecialization(item); setActiveField(null); }}>
//                             {item}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 </>
//               )}

//               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//               <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//             </div>

//             <button type="submit" className="signup-btn">Sign Up</button>

//             <p className="login-text">
//               Already have an account?{" "}
//               <span onClick={() => navigate("/login")}>Login</span>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


 import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [specialization, setSpecialization] = useState("");
  const [credentials, setCredentials] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      alert("User already exists with this email");
      return;
    }

    const newUser = {
      fullName,
      email,
      mobile,
      password,
      role,
      specialization: role === "DOCTOR" ? specialization : null,
      credentials: role === "DOCTOR" ? credentials : null,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-form">
        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
        </select>

        {role === "DOCTOR" && (
          <>
            <input
              type="text"
              placeholder="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Credentials"
              value={credentials}
              onChange={(e) => setCredentials(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Signup</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
