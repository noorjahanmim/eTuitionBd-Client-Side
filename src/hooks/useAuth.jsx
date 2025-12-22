// import React, { use } from 'react';
// import { AuthContext } from '../contexts/AuthContext/AuthContext';

// const useAuth = () => {
//     const authInfo = use(AuthContext);
//     return authInfo;
// };

// export default useAuth;



import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};

export default useAuth;
