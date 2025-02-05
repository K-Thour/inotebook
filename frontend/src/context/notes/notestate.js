import { useState } from "react";
import NoteContext from "./notecontext";
import { useLocation, useNavigate } from "react-router-dom";
const NoteState = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  const [Id, setId] = useState();
  const [progress, setProgress] = useState(0);
  const [reason, setReason] = useState();
  const [alert, setAlert] = useState(null);
  let auth =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjc5Zjc0MmQ2YTdjOTYwYzUyODMxZDk1IiwiaWF0IjoxNzM4NTEzMjk0fQ.PmUMAz02MgxLedWTqpuA17SlfhYRx2XTG5_gKbJw3Zo";
  const [note, setnote] = useState([]);
  const host = "http://localhost:4000";
  const showAlert = (type, message) => {
    setAlert({ type, message });
    if (type === "success") {
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };
  // function to register

  const register=async(name,email,password)=>{
    console.log(name);
    try {
      const response = await fetch(`${host}/inotebook/user/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( name,email, password ),
      });
      if (!response.ok) {
        showAlert("danger", "Unable to register");
        throw new Error(`Response status: ${response.status}`);
      } 
      const json=await response.json();
      console.log(json);
      showAlert("Success","user registered successfully");
    } catch (error) {
        console.error(error);
        showAlert("danger",error.message );
      }
  }

  // function to log in
  const Login = async (email, password) => {
    try {
      const response = await fetch(`${host}/inotebook/user/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( email, password ),
      });
      if (!response.ok) {
        showAlert("danger", "Unable to Login");
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      if(json.success){
        auth=json.authtoken;
        showAlert("success", "User Login successfully");
        navigate("/");
      }else{
        showAlert("warning",json.reason)
      }
    } catch (error) {
      console.error(error);
      showAlert("danger",error.message );
    }
  };
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
        showAlert("danger", "Unable to fetch notes");
        throw new Error(`Response status: ${response.status}`);
      }
      setProgress(70);
      const json = await response.json();
      setnote(json);
      // showAlert("success","Notes fetched");
      setProgress(100);
    } catch (error) {
      showAlert("danger", "Internal server error");
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
        showAlert("danger", "Unable to get notes");
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      showAlert("success", "Note added successfully");
    } catch (error) {
      console.error(error.message);
      showAlert("danger", "Internal server error");
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
        showAlert("Danger", "Unable to add the note");
        throw new Error(`Response status: ${response.status}`);
      }
      showAlert("success", "note updated successfully");
    } catch (error) {
      console.error(error.message);
      showAlert("Danger", "Internal server error");
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
        showAlert("Danger", "Unable to delete the note");
        throw new Error(`Response status: ${response.status}`);
      }
      getNotes();
      showAlert("success", "note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      showAlert("Danger", "Internal server error");
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
        setProgress,
        alert,
        showAlert,
        Login,
        register
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
