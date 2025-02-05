import React from "react";

function Alert(props) {
  return (
    <>
    {props.Alert &&
    <div style={{height: '60px'}}>
     <div>
      <div className={`alert alert-${props.Alert.type} alert-dismissible fade show`} role="alert">
        <strong>{props.Alert.type==="danger"?"failed":props.Alert.type}</strong>: {props.Alert.message}
      </div>
    </div>
    </div>}
    </>
  );
}

export default Alert;