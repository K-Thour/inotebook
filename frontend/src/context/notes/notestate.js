import { useState } from "react";
import NoteContext from "./notecontext";
import { useLocation, useNavigate } from "react-router-dom";
const NoteState = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  const [Id, setId] = useState();
  const [progress,setProgress]=useState(0);
  const [reason, setReason] = useState();
  let auth="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjc5Zjc0MmQ2YTdjOTYwYzUyODMxZDk1IiwiaWF0IjoxNzM4NTEzMjk0fQ.PmUMAz02MgxLedWTqpuA17SlfhYRx2XTG5_gKbJw3Zo";
  const [note, setnote] = useState([]);
  const host = "http://localhost:4000";
  
  // function to get notes
  const getNotes = async () => {
    try {
      setProgress(20);
      const response = await fetch(`${host}/inotebook/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
      });
      setProgress(50);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      setProgress(70);
      const json = await response.json();
      setnote(json);
      setProgress(90);
    } catch (error) {
      console.error(error.message);
    }
  };
  // function to add note in database
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/inotebook/notes/addnote`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  //function to update note from database
  const updateNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/inotebook/notes/updatenote/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }; //pending

  //function to delete note from database
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/inotebook/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      getNotes();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <NoteContext.Provider
      value={{
        location,
        getNotes,
        note,
        Id,
        setId,
        addNote,
        updateNote,
        deleteNote,
        auth,
        reason,
        progress,
        setProgress
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
