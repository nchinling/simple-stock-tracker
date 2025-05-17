// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { user } = localStorage.getItem("user");
//   return user ? children : <Navigate to="/" />;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Parse stored user

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
