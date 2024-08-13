import React, { createContext, useState } from "react";

export const loggedinContext = createContext(null);

// export const loggedinContextProvider = ({ children }) => {
//   const [loggedin, setLoggedin] = useState(null);

//   return (
//     <loggedinContext.Provider value={loggedin}>
//       {children}
//     </loggedinContext.Provider>
//   );
// };
