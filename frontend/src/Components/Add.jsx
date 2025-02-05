import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/notecontext";
function AddNote() {
  const notes = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    notes.setProgress(10);
    e.preventDefault();

    // Create a new note object
    const newNote = { title, description, tag };

    // Call the addNote function from context (assumed to be defined in context)
    notes.addNote(newNote.title,newNote.description,newNote.tag);
    notes.setProgress(100);
    // After adding the note, navigate back to the homepage or wherever you want
    navigate("/");
  };

  return (
    <form
      className="container-fluid vh-100 p-0 section"
      onSubmit={handleSubmit}
      style={{ backgroundColor: "#1a1a1a", color: "white" }}
    >
      {/* Header Section */}
      <div className="row align-items-center p-3" style={{borderBottom:"2px solid white"}}>
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
          <input
            type="text"
            className="form-control bg-transparent text-white fs-3 border-0"
            placeholder="Enter your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={30}
            required
            style={{ outline: "none", boxShadow: "none" }}
          />
        </div>
        <div className="col-2 col-md-1 text-end">
          <button
            type="submit"
            className="btn btn-success p-2"
            aria-label="Save note"
          >
            <ion-icon name="save-outline" style={{ fontSize: "25px" }}></ion-icon>
          </button>
        </div>
      </div>

      {/* Tag Input Section */}
      <div className="row p-3">
        <div className="col-12">
          <input
            type="text"
            className="form-control bg-transparent text-white fs-4"
            placeholder="Enter your tags here"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            maxLength={70}
            style={{ width: "100%", padding: "10px",border:"2px solid white" }}
          />
        </div>
      </div>

      {/* Description Textarea Section */}
      <div className="row p-3 flex-grow-1">
        <div className="col-12 h-100">
          <textarea
            required
            className="form-control bg-transparent text-white fs-4"
            placeholder="Enter your text here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              minHeight: "60vh",
              resize: "none",
              padding: "10px"
              ,border:"2px solid white",
            }}
          ></textarea>
        </div>
      </div>
    </form>
  );
}

export default AddNote;