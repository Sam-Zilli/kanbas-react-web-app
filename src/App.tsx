import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

import Labs from "./Labs";
import Kanbas from "./Kanbas";

function App() {
 return (
  // A1 2.13 Implementing Navigation in Single Page Applications 
  // In Routes - will only display the component if the URL matches
  <HashRouter>
   <div>
    {/* <Routes>
     <Route path="/" element={<Navigate to="Labs"/>}/>
     <Route path="/Labs/*" element={<Labs />} />
     <Route path="/Kanbas/*" element={<Kanbas />} />
    </Routes> */}
    <Routes>
    <Route path="/" element={<Navigate to="Labs" />} />
    <Route path="/Labs/*" element={<Labs />} />
    <Route path="/Kanbas/*" element={<Kanbas />} />
    </Routes>
   </div>
  </HashRouter>
);}


export default App;
