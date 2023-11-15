import { createContext, useContext, useState } from 'react';

const RoleContext = createContext(null);

// Context.Provider
export const RoleContextProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  return (
    <RoleContext.Provider value={[role, setRole]}>
      {children}
    </RoleContext.Provider>
  )
}

// Context.Consumer
export const useRoleContext = () => {
  return useContext(RoleContext)
}