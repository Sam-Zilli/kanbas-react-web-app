import ArrowFunctions from "./ArrowFunctions";
import BooleanVariables from "./BooleanVariables";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import IfElse from "./IfElse";
import LegacyFunctions from "./LegacyFunctions";
import TernaryOperator from "./TernaryOperator";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FindIndexFunction from "./FindIndex";
import FilterFunction from "./FilterFunction";
import JsonStringify from "./JsonStringify";
import House from "./House";
import TodoItem from "./todos/TodoItem";
import TodoList from "./todos/ToDoList";
import Spreading from "./Spreading";

export default function Lab3() {
  return(
    <div id="wd-lab3" className="container-fluid">
      <h3>Lab 3</h3>
      {/* A3 2.2.1 */}
      <VariablesAndConstants/>
      {/* A3 2.2.2 */}
      <VariableTypes />
      {/* A3 2.2.3 */}
      <BooleanVariables />
      {/* A3 2.2.4 */}
      <IfElse />
      {/* A3 2.2.5 */}
      <TernaryOperator />
      {/* A3 2.2.6 */}
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      {/* A3 2.3 */}
      <LegacyFunctions />
      {/* A3 2.3.1 */}
      <ArrowFunctions />
      {/* A3 2.3.2 Implied Returns */}
      <ImpliedReturn />
      {/* A3 2.3.3 Template Literals */}
      <TemplateLiterals />
      {/* A3 2.4 JavaScript Data Structures */}
      <SimpleArrays />
      {/* A3 2.4.1 Array Index and Length */}
      <ArrayIndexAndLength />
      {/* A3 2.4.2 Adding and Removing from Arrays */}
      <AddingAndRemovingToFromArrays />
      {/* A3 2.4.3 For Loops */}
      <ForLoops />
      {/* A3 2.4.4 The Map Function */}
      <MapFunction />
      {/* A3 2.4.5 The Find Function */}
      <FindFunction />
      {/* A3 2.4.6 The Find Index Function */}
      <FindIndexFunction />
      {/* A3 2.4.7 The Filter Function */}
      <FilterFunction />
      {/* A3 2.4.8 JSON Stringify */}
      <JsonStringify />
      {/* A3 2.4.9 JavaScript Object Notation (JSON) */}
      <House />
      {/* A3 2.4.10 Rendering a Data Structure */}
      <TodoItem />
      <TodoList />
      {/* A3 2.4.11 The Spread Operator */}
      <Spreading />
      {/* A3 2.4.12 Destructing*/}
      {/* A3 2.4.13 Destructing Function Parameters */}
      {/* A3 2.4.14 Destructing Imports */}
      {/* A3 2.5 Dynamic Styling */}
      {/* A3 2.5.1 Working with HTML classes */}
      {/* A3 2.5.2 Working with the HTML Style attribute */}
      {/* A3 2.6 Parameterizing Components */}
      {/* A3 2.6.1 Child Components */}
      {/* A3 2.6.2 Working with Location */}
      {/* A3 2.6.3 Encoding Path Parameters */}
      {/* A3 2.7.1 Writing to the Console from JavaScript */}
      {/* A3 2.7.2 Breakpoints */}
    </div>
  );
}