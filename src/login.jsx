import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
function Login() {
  return (
    <div className="container">
      <div className="login-card">
        <h1>Login</h1>

        <div className="input-group">
          <label>Username</label>
           <div className="input-box">
           <FaUser className="icon" />
          <input
            type="text"
            placeholder="Type your username"
          />
          </div>
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="input-box">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Type your password"
          />
        </div>
        </div>

        <div className="forgot">
          <a href="#">Forgot password?</a>
        </div>

        <button className="login-btn">
          LOGIN
        </button>

        <p className="social-text">
          Or Sign Up Using
        </p>

        <div className="social-icons">
          <button>
            <FaFacebookF />
          </button>

          <button>
           <FaTwitter />
          </button>

          <button>
            <FaGoogle />
          </button>
        </div>

        <div className="signup-section">
          <p>Or Sign Up Using</p>
          <a href="#">SIGN UP</a>
        </div>
      </div>
    </div>
  );
}

export default Login;