'use client';

import { useRouter } from "next/navigation";
import { BiSolidCategory } from "react-icons/bi";
import { FaTruck, FaUsers } from "react-icons/fa";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { RiUserShared2Line } from "react-icons/ri";

export default function Dashboard () {

     return (
          <div className="w-full">
               <div className="w-full flex flex-row items-center justify-between flex-wrap">
                    <ContentCard name="Categories" count={0} icon={<BiSolidCategory />} dest="categories" />
                    <ContentCard name="Vehicles" count={0} icon={<FaTruck />} dest="vehicles" />
                    <ContentCard name="Dispatchers" count={0} icon={<RiUserShared2Line />} dest="dispatchers" />
                    <ContentCard name="Sellers" count={0} icon={<MdOutlineSupervisorAccount />} dest="sellers" />
                    <ContentCard name="Clients" count={0} icon={<FaUsers />} dest="clients" />
               </div>
          </div>
     )
}

interface IContentCard {
     count: number
     name: string
     icon?: React.ReactNode
     dest?:string
}
const ContentCard:React.FC<IContentCard> = ({count, name, icon, dest='/'}) => {
     const router = useRouter();

     const navigate = (path: string) => {
          router.push(path); 
     };
     return(
          <div className="w-[47%] md:w-[30%] lg:w-[22%] justify-center rounded-[10px] shadow-sm shadow-main-primary px-[10px] py-[20px] my-[5px] items-center flex flex-col relative cursor-pointer hover:shadow-md hover:shadow-gray-400 " onClick={() => navigate(`/dashboard/${dest}`)}>
               {icon ? <i className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0 text-[100px] text-gray-100">{icon}</i> : null }
               <span className="text-[2.4rem] font-extrabold text-main-primary relative p-[5px] ">{count}</span>
               <span className="relative text-main-secondary text-[1.5rem] font-extrabold ">{name}</span>
          </div>
     )
}