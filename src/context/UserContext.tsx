'use client';

import { CUser } from "@/common/Entities";
import { createContext, useContext, useState } from "react";

interface IUserContext {
     user: CUser | null
     setUser: (user:CUser | null) => void
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({children, userData}: {children: React.ReactNode, userData:CUser | null}) => {
     const [user,setUser] = useState<CUser | null>(userData);
     return(
          <UserContext.Provider value={{user, setUser}}>
               {children}
          </UserContext.Provider>
     )
} 

export const useUser = () => {
     const context = useContext(UserContext);
     if (!context) {
          throw new Error('useUser must be used within a UserProvider');
     }
     return context;
};

export default UserContext;