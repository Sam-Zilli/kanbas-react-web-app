import { FaCircle } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark"; // Import GreenCheckmark if needed

export default function PublishAllDropdown() {
  return (

    <div className="dropdown d-inline me-1 float-end">
    <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
      type="button" data-bs-toggle="dropdown">
      <GreenCheckmark />
      Publish All
    </button>
    <ul className="dropdown-menu">
      <li>
        <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
          <GreenCheckmark />
          Publish all modules and items
        </a>
      </li>
      <li>
        <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
          <GreenCheckmark />
          Publish modules only
        </a>
      </li>

    {/* Create two more items with IDs wd-unpublish-all-modules-and-items and
          wd-unpublish-modules-only with labels Unpublish all modules and items
          and Unpublish modules only */}
      <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
          <FaCircle />
          Unpublish all modules and items 
        </a>
        <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
          <FaCircle />
          Unpublish modules only
        </a>
    </ul>
  </div>
  );
}