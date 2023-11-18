import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

// Context.Provider
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    (sessionStorage.getItem('userSession') ? JSON.parse(sessionStorage.getItem('userSession')) : null)
  );

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

// Context.Consumer
export const useUserContext = () => {
  return useContext(UserContext)
}