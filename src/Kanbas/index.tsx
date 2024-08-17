// src/Kanbas/index.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import Forbidden from "./Forbidden"
import * as client from "./Courses/client";
import { Course } from "./types";

function KanbasContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCourses = useCallback(async () => {
    if (currentUser) {
      // // console.log("Curren user id: ", currentUser._id)
      const fetchedCourses = await client.fetchUsersCourses(currentUser._id);
      setCourses(fetchedCourses);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

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
                  <Dashboard
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
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
