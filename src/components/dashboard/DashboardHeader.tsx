'use client';

import { ENotificationType } from '@/common/CommonTypes';
import { useUser } from '@/context/UserContext';
import { customLogout } from '@/util/authFunctions';
import { showMainNotification } from '@/util/NotificationFuncs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import React, {  useState } from 'react'
import { BiCategoryAlt } from 'react-icons/bi';
import { FaHome, FaTruck, FaUsers } from 'react-icons/fa';
import { FcBusinessman } from 'react-icons/fc';
import { GrAppsRounded } from 'react-icons/gr';
import { IoSettings } from 'react-icons/io5';
import { RiUserShared2Line } from 'react-icons/ri';
import { RxCross1 } from 'react-icons/rx';
import { TbLogout2 } from 'react-icons/tb';

const DashboardHeader = () => {

     return(
          <>
               <DashboardHeaderMobileView />
               <DashboardHeaderDesktopView />
          </>
     )
}

export const DashboardHeaderDesktopView = () => {
     const {user,setUser} = useUser();
     const router = useRouter()
     const logout = async () => {
          showMainNotification("Logging out...", ENotificationType.WARNING);
          await customLogout()
          setUser(null)
          router.push('/')
     }
     return (
          <div className='h-[100%] border-[1.3px]  border-gray-400 rounded-[10px] w-[15%] lg:w-[14%] hidden md:flex flex-col items-center justify-between py-[20px] px-[5px] overflow-hidden overflow-y-auto scrollbar-hide'>
               <div className='w-full flex gap-[5px] items-center justify-start flex-wrap '>
                    {user?.icon && <Image src={user?.icon} width={40} height={40} alt='user-icon' className='border-[1.4px] rounded-full border-green-600 p-[2.5px] ' />}
                    <p className='text-[0.7rem] text-main-gray-800 ' >{user?.email}</p>
               </div>
               <div className='w-full h-auto flex flex-col items-center md:gap-[40px] lg:gap-[20px]'>
                    <DashboardLink title='Overview' dest='/' icon={<FaHome />} />
                    <DashboardLink title='Categories' dest='/categories' icon={<BiCategoryAlt />}  />
                    <DashboardLink title='Vehicles' dest='/vehicles' icon={<FaTruck />}  />
                    <DashboardLink title='Dispatchers' dest='/dispatchers' icon={<RiUserShared2Line/>}  />
                    <DashboardLink title='Sellers' dest='/sellers' icon={<FcBusinessman />}  />
                    <DashboardLink title='Clients' dest='/clients' icon={<FaUsers/>}  />
               </div>
               <div className='w-full flex flex-col gap-[5px]'>
                    <DashboardLink title='Settings' dest='/settings' icon={<IoSettings/>}  />
                    <div className='w-full flex items-center justify-center lg:justify-start gap-[5px] flex-wrap hover:bg-gray-100 p-[5px] rounded-[5px] transition-all duration-150 cursor-pointer group' onClick={logout}>
                         <i className='text-[40px] lg:text-[28px] text-gray-600 hover:text-gray-800 group-hover:text-main-orange-400 '><TbLogout2 /></i>
                         <span className='hidden lg:flex text-[0.8rem] text-gray-600 group-hover:text-main-orange-400' >Logout</span></div>
               </div>
               
          </div>
     )
}

export const DashboardHeaderMobileView:React.FC = () => {
     // const router = useRouter();
     const [showLinks, setShowLinks] = useState<boolean>(false); 
     const router = useRouter()
     const logout = async () => {
          await customLogout()
          router.push('/')
     }
     return (
          <nav className='w-[98%] h-[9%] flex md:hidden flex-row items-center justify-between bg-white border-[1.3px] border-gray-300  mx-auto  py-[10px] px-[15px] rounded-[10px] relative'>
               <Link className='text-gray-400 text-[28px]'   href={'/dashboard'}><FaHome /></Link>
               <i className='text-gray-400 text-[24px] border-[1.3px] border-gray-400 rounded-[5px] p-[5px] cursor-pointer' onClick={() => setShowLinks(!showLinks)} >{!showLinks ? <GrAppsRounded /> : <RxCross1 /> }</i>
               <span className='text-gray-400 text-[28px]' onClick={logout} ><TbLogout2 /></span>
               {
                    showLinks && 
                    <div className='absolute w-full py-[10px] px-[10px] gap-[5px] flex flex-col left-[50%] -translate-x-[50%] bottom-[110%] z-10 bg-white shadow-md shadow-main-accent  rounded-[10px] '>
                         <Link className='text-[0.9rem] text-gray-500 py-[5px] px-[5px] bg-gray-100 rounded-[5px] hover:text-main-secondary hover:bg-gray-200 transition-all duration-300 ' href={'/dashboard/categories'}>Categories</Link>
                         <Link className='text-[0.9rem] text-gray-500 py-[5px] px-[5px] bg-gray-100 rounded-[5px] hover:text-main-secondary hover:bg-gray-200 transition-all duration-300 ' href={'/dashboard/listings'}>Vehicles</Link>
                         <Link className='text-[0.9rem] text-gray-500 py-[5px] px-[5px] bg-gray-100 rounded-[5px] hover:text-main-secondary hover:bg-gray-200 transition-all duration-300 ' href={'/dashboard/dispatchers'}>Dispatchers</Link>
                         <Link className='text-[0.9rem] text-gray-500 py-[5px] px-[5px] bg-gray-100 rounded-[5px] hover:text-main-secondary hover:bg-gray-200 transition-all duration-300 ' href={'/dashboard/sellers'}>Sellers</Link>
                         <Link className='text-[0.9rem] text-gray-500 py-[5px] px-[5px] bg-gray-100 rounded-[5px] hover:text-main-secondary hover:bg-gray-200 transition-all duration-300 ' href={'/dashboard/clients'}>Clients</Link>
                         <Link className='text-[0.9rem] text-gray-500 py-[5px] px-[5px] bg-gray-100 rounded-[5px] hover:text-main-secondary hover:bg-gray-200 transition-all duration-300 ' href={'/dashboard/settings'}>Clients</Link>
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
          <Link href={`/dashboard/${dest}`} className={`w-full flex items-center justify-center lg:justify-start gap-[5px] flex-wrap hover:bg-gray-100 p-[5px] rounded-[5px] transition-all duration-150 group ${active ? "bg-gray-300" :""}`}>
               <i className='text-[40px] lg:text-[28px] text-gray-600 group-hover:text-main-orange-400 '>{icon}</i>
               <span className='hidden lg:flex text-[0.8rem] text-gray-600 group-hover:text-main-orange-400'>{title}</span>
          </Link>
     )
}

export default DashboardHeader