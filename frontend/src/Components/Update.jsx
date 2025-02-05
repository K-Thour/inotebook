import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/notecontext";
function Update() {
  const notes = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  // Find the note based on the ID
  const note = notes.note.find((n) => n._id === notes.Id);
  // Initialize state with note data when the component mounts or the note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setTag(note.tag);
      setDescription(note.description);
    }
  }, [note]);

  // make save enable according to change

  const isChanged = () => {
    return (
      title !== note?.title ||
      tag !== note?.tag ||
      description !== note?.description
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    notes.setProgress(10);
    e.preventDefault();
    notes.updateNote(note._id, title, description, tag);
    notes.setProgress(100);
    navigate("/");
  };

  // If note is not found and it's not an "add" operation, show a message or redirect
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

  return (
    <form
      className="container-fluid vh-100 p-0 section"
      onSubmit={handleSubmit}
      style={{ backgroundColor: "#1a1a1a", color: "white" }}
    >
      {/* Header Section */}
      <div className="row align-items-center p-3 border-bottom" style={{borderBottom:"2px solid white"}}>
        <div className="col-2 col-md-1 text-start">
          <Link to="/" className="text-white">
            <button className="btn btn-transparent p-0" aria-label="Go back">
              <ion-icon
                name="arrow-back-outline"
                style={{ fontSize: "25px" }}
              ></ion-icon>
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
            style={{ outline: "none", boxShadow: "none" ,border:"2px solid white"}}
          />
        </div>
        <div className="col-2 col-md-1 text-end">
          <button
            id="save"
            type="submit"
            className="btn btn-success p-2"
            aria-label="Save note"
            disabled={!isChanged()}
          >
            <ion-icon
              name="save-outline"
              style={{ fontSize: "25px" }}
            ></ion-icon>
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
            maxLength={70}
            onChange={(e) => setTag(e.target.value)}
            style={{ width: "100%", padding: "10px" ,border:"2px solid white"}}
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
              padding: "10px",
              border:"2px solid white"
            }}
          ></textarea>
        </div>
      </div>
    </form>
  );
}

export default Update;
