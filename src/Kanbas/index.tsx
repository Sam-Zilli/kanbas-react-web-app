// src/Kanbas/index.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import Forbidden from "./Forbidden";

function KanbasContent() {
  // Get Current User
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-kanbas">
      <div className="d-flex h-100">
        <div className="d-none d-md-block bg-black">
          <KanbasNavigation />
        </div>
        <div className="flex-fill p-4">
          <Routes>
            <Route path="/Account/*" element={<Account />} />
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard currentUser={currentUser} />
                </ProtectedRoute>
              }
            />
            <Route path="Forbidden" element={<Forbidden />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function Kanbas() {
  return (
    <Provider store={store}>
      <KanbasContent />
    </Provider>
  );
}


// // src/Kanbas/index.tsx
// import React, { useState, useEffect, useCallback } from "react";
// import { Routes, Route, Navigate } from "react-router";
// import { Provider, useSelector } from "react-redux";
// import store from "./store";
// import Dashboard from "./Dashboard";
// import KanbasNavigation from "./Navigation";
// import Courses from "./Courses";
// import Account from "./Account";
// import ProtectedRoute from "./ProtectedRoute";
// import Forbidden from "./Forbidden";
// import * as client from "./Courses/client";

// function KanbasContent() {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [course, setCourse] = useState<any>({
//     name: "New Course",
//     number: "New Number",
//     startDate: "2023-09-10",
//     endDate: "2023-12-15",
//     description: "New Description",
//   });
  
//   // Get Current User
//   const { currentUser } = useSelector((state: any) => state.accountReducer);

//   return (
//     <div id="wd-kanbas">
//       <div className="d-flex h-100">
//         <div className="d-none d-md-block bg-black">
//           <KanbasNavigation />
//         </div>
//         <div className="flex-fill p-4">
//           <Routes>
//             <Route path="/Account/*" element={<Account />} />
//             <Route path="/" element={<Navigate to="Dashboard" />} />
//             <Route
//               path="Dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard
//                     courses={courses}
//                     setCourses={setCourses}
//                     currentUser={currentUser}
//                   />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="Courses/:cid/*"
//               element={
//                 <ProtectedRoute>
//                   <Courses courses={courses} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="Forbidden" element={<Forbidden />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Kanbas() {
//   return (
//     <Provider store={store}>
//       <KanbasContent />
//     </Provider>
//   );
// }
