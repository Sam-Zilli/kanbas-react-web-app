import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";

export default function Lab4() {
  // A4 2.2.3 Passing Functions as Parameters
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab4" className="container-fluid">
      <h1>Lab 4</h1>
      <ClickEvent />
      <PassingDataOnEvent />
      {/* A4 2.2.3 Passing Functions as Parameters */}
      <PassingFunctions theFunction={sayHello} />
      {/* A4 2.2.4 The Event Object */}
      <EventObject />
      {/* A4 2.3.2 Integer State Variables */}
      <Counter />
      {/* A4 2.3.3 Boolean State Variables */}
      <BooleanStateVariables />
      {/* A4 2.3.4 String State Variables */}
      <StringStateVariables />
      {/* A4 2.3.5 Date State Variables */}
      <DateStateVariable />
      {/* A4 2.3.6 Object State Variable */}
      <ObjectStateVariable />
      {/* A4 2.3.7 Array State Variable */}
      <ArrayStateVariable />
      {/* A4 2.3.8 Sharing State Between Components */}
      <ParentStateComponent />
      {/* A4 2.4 Managing Application State */}
      <ReduxExamples />
    </div>
  );
}
