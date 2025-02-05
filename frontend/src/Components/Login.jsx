import React, { useContext, useState } from "react";
import { Link } from "react-router";
// import Alerts from "./Alerts";
import NoteContext from "../context/notes/notecontext";
function Login() {
  const data = useContext(NoteContext);
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [type, setType] = useState("password");
  const handleSubmit = async (e) => {
    e.preventDefault();
    data.Login({email,password:pass});
  };
  const showPass = (e) => {
    type === "password" ? setType("text") : setType("password");
  };
  const handleFocus = (e) => {
    e.target.removeAttribute("readOnly");
  };
  return (
    <>
      <section className="section">
        <div className="form-box">
          <form action="" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline" className="icon"></ion-icon>
              <input
                type="email"
                name="email"
                id="e-address"
                readOnly
                onFocus={handleFocus}
                required
                style={{ outline: "none" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="e-address">Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline" className="icon"></ion-icon>
              <input
                type={type}
                style={{ background: "transparent" }}
                name="password"
                id="pass"
                readOnly
                onFocus={handleFocus}
                required
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              <label htmlFor="pass">Password</label>
            </div>
            <div className="forget">
              <label htmlFor="Remember">
                <input
                  type="checkbox"
                  name=""
                  id="Remember"
                  onClick={showPass}
                />
                Show password
              </label>
            </div>
            <div className="register mt-5">
              <button>Log in</button>
              <p>
                Don't have a account <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
