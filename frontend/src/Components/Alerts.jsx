import React from "react";

function Alert(props) {
  console.log(props)
  return (
    <div style={{height: '60px'}}>
     <div>
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>hello</strong>! hi
      </div>
    </div>
    </div>
  );
}

export default Alert;