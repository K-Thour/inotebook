import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/notecontext";
function View() {
  const notes = useContext(NoteContext);

  // Find the note using `find` instead of `map`
  const note = notes.note.find((n) => n._id === notes.Id);
  const navigate=useNavigate();
  // Handle case where note is not found
  if (!note) {
    return (
      <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
        <h1>Note Not Found</h1>
        <Link to="/" className="btn btn-primary mt-3">
          Go Back
        </Link>
      </div>
    );
  }
  const deleteNote=async(e)=>{
    e.stopPropagation();
    e.preventDefault();
    notes.deleteNote(notes.Id);
    navigate("/");
  }

  return (
    <div className="container-fluid vh-100 bg-dark text-white p-0 section">
      {/* Header Section */}
      <div className="row align-items-center p-3 border-bottom " style={{border:"2px solid white"}}>
        <div className="col-2 col-md-1 text-start">
          <Link to="/" className="text-white">
            <button
              className="btn btn-transparent p-0"
              aria-label="Go back"
            >
              <ion-icon name="arrow-back-outline" style={{ fontSize: "25px" }}></ion-icon>
            </button>
          </Link>
        </div>
        <div className="col-8 col-md-10 text-center">
          <h1 className="m-0">{note.title}</h1>
        </div>
        <div className="col-2 col-md-1 text-end">
          <Link to="/update">
            <button
              className="btn btn-success me-2"
              style={{ fontSize: "22px" }}
              aria-label="Edit note"
            >
              <ion-icon name="pencil-outline"></ion-icon>
            </button>
          </Link>
          <Link to="/">
          <button
            className="btn btn-danger"
            style={{ fontSize: "22px",marginTop:"10px" }}
            aria-label="Delete note"
            id={note.id}
            onClick={deleteNote}
          >
            <ion-icon name="trash-outline" id={note.id}></ion-icon>
          </button>
          </Link>
        </div>
      </div>

      {/* Tag Section */}
      <div className="row p-3">
        <div className="col-12">
          <h3 className="text-start" style={{ color: "white",wordWrap:"break-word" }}>
            #{note.tag}
          </h3>
        </div>
      </div>

      {/* Description Section */}
      <div className="row p-3 flex-grow-1">
        <div className="col-12">
          <pre
            className="text-white text-justify"
            style={{ fontWeight: "bold", fontSize: "1.2rem",wordWrap:"break-word",textWrap:"pretty" }}
          >
            {note.description}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default View;