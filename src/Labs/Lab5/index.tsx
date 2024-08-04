import EnvironmentVariables from "./EnvironmentVariables";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a href={`${REMOTE_SERVER}/lab5/welcome`} className="list-group-item">
          Welcome
        </a>

        <a href={`${REMOTE_SERVER}/lab5/add/5/10`} className="list-group-item">
          Add 5 + 10
        </a>

      </div><hr />
      <EnvironmentVariables />
    </div>
  );
}
