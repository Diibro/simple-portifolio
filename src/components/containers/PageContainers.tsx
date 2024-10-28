import React from "react";

export const ClientPageContainer = ({children}:{children:React.ReactNode}) => {
     return (
          <div className="w-[90%] flex flex-col items-center gap-[20px]">
               {children}
          </div>
     )
}