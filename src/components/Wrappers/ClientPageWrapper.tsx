import React from "react"
import Footer from "../Footer"
import Header from "../Header"


const ClientPageWrapper:React.FC<{children:React.ReactNode}> = ({children}) => {

     return (
          <>

               <Header />
               {children}
               <Footer />
          </>
     )
}

export default ClientPageWrapper