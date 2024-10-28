import React from "react"
import Footer from "../Footer"
import Header from "../Header"


const ClientPageWrapper:React.FC<{children:React.ReactNode}> = ({children}) => {

     return (
          <div className="w-full flex flex-col items-center py-[5px] ">
               <Header />
               <div className="w-[98%] 2xl:w-full flex flex-col items-center gap-[10px] ">
                    {children}
               </div>
               <Footer />
          </div>
     )
}

export default ClientPageWrapper