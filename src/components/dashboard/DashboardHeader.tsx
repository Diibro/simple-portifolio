'use client';

import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BiCategoryAlt } from 'react-icons/bi';
import { FaHome, FaPlus, FaTruck, FaUsers } from 'react-icons/fa';
import { FcBusinessman } from 'react-icons/fc';
import { IoMdSettings } from 'react-icons/io';
import { IoSettings } from 'react-icons/io5';
import { RiUserShared2Line } from 'react-icons/ri';
import { RxCross1 } from 'react-icons/rx';
import { useMediaQuery } from 'react-responsive'

const DashboardHeader = () => {
     const isLargerThanTablet = useMediaQuery({query: '(min-width: 768px)' });

     if(!isLargerThanTablet){
          return(
               <MobileView />
          )
     }
     return (
          <div className='h-[95%] border-[1.3px] border-gray-400 rounded-[10px] w-[15%] lg:w-[11%] flex flex-col items-center justify-evenly py-[20px] px-[5px] overflow-hidden overflow-y-auto scrollbar-hide'>
               <div className='w-full h-auto flex flex-col items-center md:gap-[40px] lg:gap-[20px]'>
                    <DashboardLink title='Overview' dest='/' icon={<FaHome />} />
                    <DashboardLink title='Categories' dest='/categories' icon={<BiCategoryAlt />}  />
                    <DashboardLink title='Vehicles' dest='/vehicles' icon={<FaTruck />}  />
                    <DashboardLink title='Dispatchers' dest='/dispatchers' icon={<RiUserShared2Line/>}  />
                    <DashboardLink title='Sellers' dest='/sellers' icon={<FcBusinessman />}  />
                    <DashboardLink title='Clients' dest='/clients' icon={<FaUsers/>}  />
               </div>
               <div className='w-full'>
                    <DashboardLink title='Settings' dest='/settings' icon={<IoSettings/>}  />
               </div>
               
          </div>
     )
}

const MobileView:React.FC = () => {
     // const router = useRouter();
     const [showLinks, setShowLinks] = useState<boolean>(false); 

     // const navigate = (path: string) => {
     //      router.push(path);
     // }
     return (
          <nav className='w-[98%] h-[9%] flex flex-row items-center justify-between bg-white border-[1.3px] border-gray-300  mx-auto  py-[10px] px-[15px] rounded-[10px] relative'>
               <Link className='text-gray-400 text-[28px]'   href={'/dashboard'}><FaHome /></Link>
               <i className='text-gray-400 text-[24px] border-[1.3px] border-gray-400 rounded-[5px] p-[5px] cursor-pointer' onClick={() => setShowLinks(!showLinks)} >{!showLinks ? <FaPlus /> : <RxCross1 /> }</i>
               <Link className='text-gray-400 text-[28px]'   href={'/dashboard/settings'}><IoMdSettings /></Link>
               {
                    showLinks && 
                    <div className='absolute w-full py-[10px] px-[10px] gap-[5px] flex flex-col left-[50%] -translate-x-[50%] bottom-[110%] z-10 bg-white shadow-md shadow-main-accent  rounded-[10px] '>
                         <Link className='text-[0.9rem] text-gray-500 py-[5px] px-[5px] bg-gray-100 rounded-[5px] hover:text-main-secondary hover:bg-gray-200 transition-all duration-300 ' href={'/dashboard/categories'}>Categories</Link>
                         <Link className='text-[0.9rem] text-gray-500 py-[5px] px-[5px] bg-gray-100 rounded-[5px] hover:text-main-secondary hover:bg-gray-200 transition-all duration-300 ' href={'/dashboard/listings'}>Vehicles</Link>
                         <Link className='text-[0.9rem] text-gray-500 py-[5px] px-[5px] bg-gray-100 rounded-[5px] hover:text-main-secondary hover:bg-gray-200 transition-all duration-300 ' href={'/dashboard/dispatchers'}>Dispatchers</Link>
                         <Link className='text-[0.9rem] text-gray-500 py-[5px] px-[5px] bg-gray-100 rounded-[5px] hover:text-main-secondary hover:bg-gray-200 transition-all duration-300 ' href={'/dashboard/sellers'}>Sellers</Link>
                         <Link className='text-[0.9rem] text-gray-500 py-[5px] px-[5px] bg-gray-100 rounded-[5px] hover:text-main-secondary hover:bg-gray-200 transition-all duration-300 ' href={'/dashboard/clients'}>Clients</Link>
                    </div>
               }
          </nav>
     )
}

interface IDashboadLink {
     title:string
     dest:string
     icon: React.ReactNode
     active?:boolean
}
const DashboardLink: React.FC<IDashboadLink > = ({title,dest, icon, active}) => {
     return (
          <Link href={`/dashboard/${dest}`} className={`w-full flex items-center justify-center lg:justify-start gap-[5px] flex-wrap hover:bg-gray-100 p-[5px] rounded-[5px] transition-all duration-150 ${active ? "bg-gray-300" :""}`}>
               <i className='text-[40px] lg:text-[28px] text-gray-600 hover:text-gray-800 '>{icon}</i>
               <span className='hidden lg:flex text-[0.8rem] text-gray-600'>{title}</span>
          </Link>
     )
}

export default DashboardHeader