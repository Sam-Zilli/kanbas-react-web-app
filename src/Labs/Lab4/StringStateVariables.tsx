import React, { useState } from "react";
// import useState
export default function StringStateVariables() {
  const [firstName, setFirstName] = useState("John");
  // declare and
  return (
    // initialize
    <div>
      <h2>String State Variables</h2>
      <p>{firstName}</p>
      <input
        // state variable
        className="form-control"
        // initialize a
        value={firstName}
        // text input field with the state variable
        onChange={(e) => setFirstName(e.target.value)}
      />
      <hr />
    </div>
  );
}
