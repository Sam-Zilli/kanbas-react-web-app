import React, { useState } from "react";
// import useState
export default function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Peter", age: 24 });
  // declare and initialize object state
  return (
    // variable with multiple fields
    <div>
      <h2>Object State Variables</h2>
      <pre>{JSON.stringify(person, null, 2)}</pre>
      <input
        // initialize input field with an object's
        value={person.name}
        // field value
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
        // update field as user types. copy old
      />
      <input
        // value
        value={person.age}
        // update field as user types. copy old
        onChange={(e) =>
          setPerson({
            ...person,
            // object,
            age: parseInt(e.target.value),
          })
        }
        // override specific field with new value
      />
      <hr />
    </div>
  );
}
