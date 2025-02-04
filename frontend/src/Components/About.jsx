import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/notecontext'
import { useNavigate } from 'react-router';

function About() {
  const data=useContext(NoteContext);
  const navigate=useNavigate();
  return (
    <section>
    <div className="container mt-5 grid column-gap-3" style={{display: "flex", justifyContent: "center", alignItems: "center" ,height: "85vh"}}>
      <div className="card center" style={{width: "50rem", borderRadius:"70px",background:"transparent",border:"2px solid white"}} >
        <div className="card-body  box-shadow" style={{height: "20rem"}}>
          <h1 className="card-title mt-1" autoCapitalize='true' style={{ textAlign:"center" ,color:"white"}}>Profile</h1>
          <p className="card-text mt-5" style={{textAlign:"center", color:"white"}}><strong >Name:</strong> &nbsp;  name</p>
          <p className="card-text mt-5" style={{textAlign:"center", color:"white"}}><strong>Email:</strong> &nbsp; email</p>
          <button className="btn btn-primary mt-3" autoCapitalize='true' style={{borderRadius:"30px"}}>Logout</button>
        </div>
      </div>
    </div>
    </section>
  )
}

export default About
