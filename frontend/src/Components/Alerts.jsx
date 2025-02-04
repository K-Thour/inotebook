import React from "react";

function Alert(props) {
  console.log(props)
  console.log(props.Alert)
  return (
    <>
    {props.Alert &&
    <div style={{height: '60px'}}>
     <div>
      <div class={`alert alert-${props.Alert.type} alert-dismissible fade show`} role="alert">
        <strong>{props.Alert.type}</strong>: {props.Alert.message}
      </div>
    </div>
    </div>}
    </>
  );
}

export default Alert;