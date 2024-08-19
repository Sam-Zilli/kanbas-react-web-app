import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { User } from "./types";

const Forbidden: React.FC = () => {

  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser) as User | null;

  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }

  if (currentUser.role === "ADMIN") {
    return <div>Welcome, Admin!</div>; 
  } else {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>403 Forbidden</h1>
        <p style={styles.message}>
          You do not have permission to view this page.
        </p>
        <a href="/" style={styles.link}>Go to Home</a>
      </div>
    );
  }
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    padding: '20px'
  },
  title: {
    fontSize: '3rem',
    color: '#dc3545'
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '20px'
  },
  link: {
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none'
  }
};

export default Forbidden;
