import EnvironmentVariables from "./EnvironmentVariables";
import HttpClient from "./HttpClient";
import PathParameters from "./PathParameters";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a href={`${REMOTE_SERVER}/lab5/welcome`} className="list-group-item">
          Welcome
        </a>

        <PathParameters />
        <WorkingWithObjects />
        <WorkingWithArrays />
        <HttpClient />

      </div><hr />
      <EnvironmentVariables />
    </div>
  );
}
