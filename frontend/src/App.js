import React, { useContext } from "react";
import {  Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Login from "./Components/Login";
import View from "./Components/View";
import Update from "./Components/Update";
import AddNote from "./Components/Add";
import LoadingBar from "react-top-loading-bar";
import "./app.css";
import NoteContext from "./context/notes/notecontext";
import Alert from "./Components/Alerts";
import NotFound from "./Components/Notfound";
function App() {
  let path=useContext(NoteContext);
  return (
    <div className="bg-dark">
    <LoadingBar height={3} color="yellow" progress={path.progress} onLoaderFinished={()=>path.setProgress(0)} />
    {path.location.pathname==="/"||path.location.pathname==="/about"?<Navbar/>:""}
      <Alert Alert={path.alert}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view" element={<View />} />
          <Route path="/update" element={<Update/>}/>
          <Route path="/add" element={<AddNote/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;