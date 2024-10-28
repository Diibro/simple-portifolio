'use client';

import { ICategory, IListing } from "@/common/Interfaces"
import { createContext, useContext, useState } from "react"

export interface IAppData {
     categories: Array<ICategory>
     listings: Array<IListing>

}

interface IAppContext {
     data: IAppData | null
     setData: (data: IAppData | null) => void
}

const AppContext = createContext<IAppContext | undefined>(undefined)

export const AppProvider = ({children, appData} : {children: React.ReactNode, appData: IAppData | null}) => {
     const [data, setData ] = useState<IAppData | null>(appData);
     return (
          <AppContext.Provider value={{data, setData}}  >
               {children}
          </AppContext.Provider>
     )
}

export const useAppData = () => {
     const context = useContext(AppContext);
     if(!context) throw new Error("useApp must be used with in a app provider");
     return context;
     
}

export default AppContext