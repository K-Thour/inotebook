import { useContext, useState } from "react";
import { Link } from "react-router";
import NoteContext from "../context/notes/notecontext";
function Register() {
  const data=useContext(NoteContext);
  const [name,setName]=useState("");
  const [email,setEmail]=useState();
  const [pass,setPass]=useState();
  const [type,setType]=useState("password");
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(name,email,pass);
  }
  const showPass=(e)=>{
    type==="password"?setType("text"):setType("password");
  }
  const handleFocus = (e) => {
    e.target.removeAttribute("readOnly");
  };
  return (
    <section className="section">
      <div className="form-box">
        <form action="" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="inputbox">
            <ion-icon name="person-circle-outline" className="icon"></ion-icon>
            <input type="text" name="" id="name" onChange={(e)=>{setName(e.target.value)}} minLength="3" required />
            <label htmlFor="name">Username</label>
          </div>
          <div className="inputbox">
            <ion-icon name="mail-outline" className="icon"></ion-icon>
            <input type="email" name="" id="e-address" onFocus={handleFocus} readOnly onChange={(e)=>{setEmail(e.target.value)}} required />
            <label htmlFor="e-address">Email</label>
          </div>
          <div className="inputbox">
            <ion-icon name="lock-closed-outline" className="icon"></ion-icon>
            <input type={type} name="" id="pass" onFocus={handleFocus} readOnly onChange={(e)=>{setPass(e.target.value)}} minLength="8" required />
            <label htmlFor="pass">Password</label>
          </div>
          <div className="forget">
            <label htmlFor="Remember">
              <input type="checkbox" name="" id="Remember"  onClick={showPass} onFocus={handleFocus} readOnly/>
              Show password
            </label>
          </div>
          <div className="register mt-3">
            <button>Sign up</button>
            <p>
              already have an account <Link to="/login">Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
