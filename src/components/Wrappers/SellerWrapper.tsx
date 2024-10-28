'use client';

import { ENotificationType } from '@/common/CommonTypes';
import { useUser } from '@/context/UserContext'
import { customLogout } from '@/util/authFunctions';
import { showMainNotification } from '@/util/NotificationFuncs';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { IoMenu } from 'react-icons/io5';
import { MdMessage } from 'react-icons/md';

const SellerWrapper = ({children}: {children: React.ReactNode}) => {
     return (
          <div className='w-full p-[10px] flex flex-col items-center gap-[10px] '>
               <Header/>
               {children}
          </div>
     )
}

const Header = () => {
     const {user} = useUser();
     const router = useRouter();
     const logout = async() => {
          showMainNotification("Logging out...", ENotificationType.WARNING);
          const res = await customLogout();
          if(res) {
               showMainNotification("Logout success", ENotificationType.PASS);
               router.push('/');
          }else {
               showMainNotification("Error logging out. Contact support please", ENotificationType.FAIL);
          }
     }
     return (
          <div className='w-full lg:w-[90%] p-[10px] border border-blue-500 rounded-[10px] flex items-center justify-between '>
               <div className='w-auto flex items-center gap-[10px] '>
                    <Image className='cursor-pointer rounded-full border-[1.2px] border-blue-600 p-[2.5px] ' onClick={() => router.push('/seller')} src={'/images/user-icon.png'} width={40} height={40} alt="profile icon" />
                    <h4  className='text-main-text text-[1rem] font-bold'>{user?.name}</h4>
               </div>
               <div className='w-auto relative group'>
                    <i className='text-[32px] text-blue-600 cursor-pointer'><IoMenu /></i>
                    <div className=' w-[200px] absolute hidden group-hover:flex flex-col gap-[5px] top-full right-0 bg-white shadow-sm shadow-gray-200 p-[5px] rounded-[5px]'>
                         <Link className='text-blue-600 text-[0.8rem] flex items-center gap-[5px] w-full p-[5px] rounded-[5px] hover:bg-blue-200 ' href={'/seller/profile'}><i className='text-[24px] '><CgProfile /></i><span>Profile</span></Link>
                         <Link className='text-blue-600 text-[0.8rem] flex items-center gap-[5px] w-full p-[5px] rounded-[5px] hover:bg-blue-200 ' href={'/seller/requests'}><i className='text-[24px] '><MdMessage/></i><span>Requests</span></Link>
                         <div onClick={logout} className='text-blue-600 cursor-pointer text-[0.8rem] flex items-center gap-[5px] w-full p-[5px] rounded-[5px] hover:bg-blue-200 '><i className='text-[24px] '><FiLogOut/></i><span>Logout</span></div>
                    </div>
               </div>
          </div>
     )
}

export default SellerWrapper