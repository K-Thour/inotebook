import React, { useContext } from "react";
import NoteContext from "../context/notes/notecontext";
import { useNavigate } from "react-router";
function About() {
  const data = useContext(NoteContext);
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("auth");
    navigate("/Login");
    data.setCalled(false);
    data.showAlert("success","User Logout Successfully");
  }
  return (
    <section className="section">
      <div
        className="container mt-5 grid column-gap-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <div
          className="card center"
          style={{
            width: "50rem",
            borderRadius: "70px",
            background: "transparent",
            border: "2px solid white",
          }}
        >
          <div className="card-body  box-shadow" style={{ height: "20rem" }}>
            <h1
              className="card-title mt-1"
              autoCapitalize="true"
              style={{ textAlign: "center", color: "white" }}
            >
              Profile
            </h1>
            <p
              className="card-text mt-5"
              style={{ textAlign: "center", color: "white",cursor:"default" }}
            >
              <strong>Name:</strong> &nbsp;<b style={{textDecoration:"underline"}}> {data.user.name}</b> 
            </p>
            <p
              className="card-text mt-5"
              style={{ textAlign: "center", color: "white",cursor:"default" }}
            >
              <strong>Email:</strong> &nbsp;<b style={{textDecoration:"underline"}}>{data.user.email}</b> 
            </p>
            <button
              className="btn btn-primary mt-3"
              autoCapitalize="true"
              style={{ borderRadius: "30px" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
