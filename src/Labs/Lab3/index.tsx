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

    </div>
  );
}