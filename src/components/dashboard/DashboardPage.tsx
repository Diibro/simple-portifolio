import { ReactNode } from "react"

interface IDashboard{
     children: ReactNode
}
const DashboardPage:React.FC<IDashboard> = ({children}) => {
     return (
          <main className="w-[98%] md:w-[82.5%] lg:w-[87.5%] mx-auto h-[90%] md:h-[95%] border-[1.3px] border-gray-300 rounded-[10px] p-[5px] px-[10px] flex flex-row justify-start flex-wrap overflow-y-auto">{children}</main>
     )
}

export default DashboardPage