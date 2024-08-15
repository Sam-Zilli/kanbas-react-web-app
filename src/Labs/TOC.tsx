import { useLocation } from "react-router";

// Function component for Table of Contents (TOC)
export default function TOC() {
    // Retrieve the current pathname from the URL
    const { pathname } = useLocation();
    
    return (
      <ul className="nav nav-pills" id="wd-toc">
        {/* Main section link */}
        <li className="nav-item">
          <a id="wd-a" href="#/Labs" className="nav-link">Labs</a>
        </li>
        
        {/* Lab 1 link - active class applied if pathname includes "Lab1" */}
        <li className="nav-item">
          <a id="wd-a1" href="#/Labs/Lab1"
             className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>
            Lab 1
          </a>
        </li>
  
        {/* Lab 2 link - active class applied if pathname includes "Lab2" */}
        <li className="nav-item">
          <a id="wd-a2" href="#/Labs/Lab2"
             className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>
            Lab 2
          </a>
        </li>
  
        {/* Lab 3 link - active class applied if pathname includes "Lab3" */}
        <li className="nav-item">
          <a id="wd-a3" href="#/Labs/Lab3"
             className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>
            Lab 3
          </a>
        </li>
  
        {/* Lab 4 link - active class applied if pathname includes "Lab4" */}
        <li className="nav-item">
          <a id="wd-a4" href="#/Labs/Lab4"
             className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>
            Lab 4
          </a>
        </li>
        
        {/* Lab 5 link - active class applied if pathname includes "Lab5" */}
        <li className="nav-item">
          <a id="wd-a5" href="#/Labs/Lab5"
             className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>
            Lab 5
          </a>
        </li>


                
        {/* Lab 6 link - active class applied if pathname includes "Lab6" */}
        <li className="nav-item">
          <a id="wd-a6" href="#/Labs/Lab6"
             className={`nav-link ${pathname.includes("Lab6") ? "active" : ""}`}>
            Lab 6
          </a>
        </li>
        
        {/* Kanbas link */}
        <li className="nav-item">
          <a id="wd-k" href="#/Kanbas" className="nav-link">Kanbas</a>
        </li>
        
        {/* Front end GitHub repository link */}
        <li className="nav-item">
          <a id="wd-github" href="https://github.com/Sam-Zilli/kanbas-react-web-app" target="_blank"
             className="nav-link">Front end Github</a>
        </li>
  
        {/* Server side GitHub repository link */}
        <li className="nav-item">
          <a id="wd-github" href="https://github.com/Sam-Zilli/kanbas-node-server-app.git" target="_blank"
             className="nav-link">Server side Github</a>
        </li>    
      </ul>
    );
  }