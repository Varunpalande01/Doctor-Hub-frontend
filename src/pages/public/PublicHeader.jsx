import { useNavigate } from "react-router-dom";
import "./PublicHeader.css";

const PublicHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="public-header">
      <div className="logo">MyProject</div>

      <div className="auth-buttons">
        <button onClick={() => navigate("/login")}>Login</button>
        <button className="signup" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default PublicHeader;
