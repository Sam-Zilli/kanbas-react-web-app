import { FaCircle } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";

export default function PublishAllDropdown() {
  return (
    <div className="dropdown d-inline me-1 float-end">
      <button
        id="wd-publish-all-btn"
        className="btn btn-lg btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <GreenCheckmark />
        Publish All
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            id="wd-publish-all-modules-and-items-btn"
            className="dropdown-item"
            type="button"
          >
            <GreenCheckmark />
            Publish all modules and items
          </button>
        </li>
        <li>
          <button
            id="wd-publish-modules-only-button"
            className="dropdown-item"
            type="button"
          >
            <GreenCheckmark />
            Publish modules only
          </button>
        </li>
        <li>
          <button
            id="wd-unpublish-all-modules-and-items"
            className="dropdown-item"
            type="button"
          >
            <FaCircle className="text-danger" />
            Unpublish all modules and items
          </button>
        </li>
        <li>
          <button
            id="wd-unpublish-modules-only"
            className="dropdown-item"
            type="button"
          >
            <FaCircle className="text-danger" />
            Unpublish modules only
          </button>
        </li>
      </ul>
    </div>
  );
}