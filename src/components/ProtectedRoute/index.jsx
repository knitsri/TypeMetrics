// import { Navigate } from 'react-router-dom';

// function ProtectedRoute({ children }) {
//   const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;

import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const currentUser = localStorage.getItem("username"); 

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
