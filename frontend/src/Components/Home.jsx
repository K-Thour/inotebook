import React, { useContext, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import NoteContext from "../context/notes/notecontext";
function Home() {
  let notes = useContext(NoteContext);
  const navigate=useNavigate();
  console.log("hi");
  let handleClick = (e) => {
    notes.setId(e.currentTarget.id);
  };
  const deleteNote=async(e)=>{
    e.stopPropagation();
    e.preventDefault();
    notes.deleteNote(e.target.id);
    navigate("/");
  }
  useEffect(()=>{
    if(!notes.auth){
      notes.showAlert("warning","Please Login");
      navigate("/login");
    }else{
    notes.setProgress(10);
    notes.getuser();
    notes.getNotes()
    notes.Welcome();
    }
  },[notes.auth])
  return (
    <div
      className="d-flex flex-column section list"
      style={{ minHeight:"100vh",height: "100%", width: "100vw", overflow: "hidden" }}
    >
      <div className="d-flex flex-row vw-100 align-items-center">
        <div style={{ width: "95%" }}>
          <h3 className="text-center mt-3 text-white ms-5">Your Notes</h3>
        </div>
        <div className="me-4" id="add" style={{ width: "5%",marginRight:"100px" }} onClick={handleClick}>
          <Link to="/add">
            <button id="add" className="text-white me-5 mt-2" onClick={handleClick} style={{ background: "transparent", fontSize: "25px" ,width:"4vw",padding:"5px 10px 0 0"}}>
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </Link>
        </div>
      </div>
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          height: "100%",
        }}
      >
        {notes.note.map((note) => (
          <div
            key={note._id}
            className="my-3"
            style={{ width: "400px", height: "400px" }}
            onClick={handleClick}
            id={note._id}
          >
            <NavLink to="/view" style={{ textDecoration: "none" }}>
              <div
                className="card flex hover"
                style={{
                  height: "100%",
                  overflow: "hidden",
                  cursor: "pointer",
                  paddingBottom: "30px",
                  borderRadius: "30px",
                  backgroundColor: "transparent",
                }}
              >
                <div className="d-flex justify-content-between ">
                  <div>
                    <p className="card-text mt-2 ms-2 text-white tag overlap" style={{ color: "grey" }}>
                      #{note.tag}
                    </p>
                  </div>
                  <div className="d-flex me-2">
                    <Link to="/update">
                      <button
                        className="mt-2 me-2 bg-success"
                        style={{
                          height: "29px",
                          width: "35px",
                          padding: "3px",
                        }}
                      >
                        <ion-icon name="pencil-outline"></ion-icon>
                      </button>
                    </Link>
                    <Link to="/">
                    <button
                        className="mt-2 me-2 bg-danger"
                        style={{
                          height: "29px",
                          width: "35px",
                          padding: "3px",
                        }}
                        id={note._id}
                        onClick={deleteNote}
                      >
            <ion-icon name="trash-outline" id={note._id} ></ion-icon>
          </button>
          </Link>
                  </div>
                </div>
                <div className="card-body d-flex flex-column justify-content-center mb-5">
                  <h1
                    className="card-title text-white overlap"
                    style={{ textAlign: "center", textWrap: "wrap",height:"20%" }}
                  >
                    {note.title}
                  </h1>
                  <pre
                    className="card-text mt-1 text-white overlap"
                    style={{
                      textAlign: "center",
                      fontSize: ".9rem",
                      fontWeight: "bold",
                      textWrap: "wrap",
                    }}
                  >
                    {note.description}
                  </pre>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;