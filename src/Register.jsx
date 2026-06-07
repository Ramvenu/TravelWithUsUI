import "./Register.css";
import charminar from "./assets/images/charminar.jpg";

function Register() {
  return (
    <div className="register-container">
      <div className="left-panel">
        <img src={charminar} alt="Travel" className="travel-image" />
        <div className="overlay">
          <h1>Travel With Us</h1>
          <p>
            Discover amazing destinations and create unforgettable memories.
          </p>
        </div>
      </div>

      <div className="right-panel">
        <div className="register-card">
          <h2>Create Account</h2>
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button className="register-btn">
            REGISTER
          </button>
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;