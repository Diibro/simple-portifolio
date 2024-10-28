'use client';

import { FiMenu } from "react-icons/fi";
import Data from "@/data/data.json";

import MyImage from "./Images/MyImage"
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { TLocale } from "@/common/CommonTypes";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { CUser } from "@/common/Entities";

interface IHeader {
     actionBtn?: string
     accountBtn?: string
     navLinks: Array<{name:string, dest:string}>
     user:CUser | null
}

const Header = () => {
     const t = useTranslations('header');
     const actionBtnStr = t("actionBtn");
     const accountBtnStr = t("accountBtn");
     const navLinks:Array<{name:string, dest: string}> = t.raw('navLinks');
     const {user} = useUser();

     return (
          <>
               <MobileView accountBtn={accountBtnStr} user={user} actionBtn={actionBtnStr} navLinks={navLinks}   />
               <DesktopView accountBtn={accountBtnStr} user={user} actionBtn={actionBtnStr} navLinks={navLinks}   />
          </>
     )
}

const DesktopView:React.FC<IHeader> = ({accountBtn, navLinks, user, actionBtn}) => {
     const categoryTypes = Data.categoryTypes;
     const locale = useLocale() as TLocale;
     return (
          <div className="w-full flex-col shadow-sm hidden md:flex">
          <div className="w-full flex flex-row justify-between items-center  py-[5px] px-[5%] relative border-b-[1.3px] border-slate-300 ">
               <div className="w-[50px] h-[50px] border-[1.4px] border-main-blue-600 rounded-[100px] p-[2.5px] overflow-hidden cursor-pointer hover:border-main-secondary">
                    <MyImage image="/logo/logo.jpg" rounded="100px" />
               </div>
               <div className="w-auto flex items-center gap-[10px] ">
                    {
                         navLinks.map((link, index) => <NavLink name={link.name} key={`desktop-view-nav-link-${index}`} dest={link.dest} />)
                    }
               </div>
               <div className="w-auto flex flex-row gap-[5px] h-auto items-center">
                    {user ? 
                    <Link href={`${user.type === 'seller' ? '/seller' : '/'}`}><Image src={'/images/user-icon.png'} width={40} height={40} alt="profile icon" /></Link>:
                    <Link href={'/auth/login'} className="text-[0.8rem] font-medium text-white bg-main-orange-600 border-[1.2px] border-main-orange-600 rounded-[5px] py-[5px] px-[20px] transition-all duration-300 hover:bg-white hover:text-main-orange-600 ">{accountBtn}</Link>}
               </div>
          </div>
          <div className={`relative py-[10px] px-[5%] top-full left-0 flex flex-row w-full gap-[10px] `}>
               {categoryTypes.map(((group,index) => 
                    <div className="w-auto flex items-center justify-start gap-[10px] cursor-pointer border-[1.2px] border-main-gray-400 p-[2.5px] mx-auto text-main-gray-700 hover:text-main-gray-900 hover:bg-slate-50 rounded-[5px] flex-1 text-center" key={`header-category-group-${index}`} >
                         <Image src={group.icon} width={50} height={50} className="aspect-[100/80] rounded-[2.5px]" alt={group.name[locale] || "en"}/>
                         <span className="text-[0.85rem]">{group.name[locale]}</span>
                    </div> ))}
          </div>
     </div>
     )
} 


const MobileView:React.FC<IHeader> = ({accountBtn, navLinks, user, actionBtn}) => {
     const [showCategories, setShowCategories] = useState(false);
     const categoryTypes = Data.categoryTypes;
     const locale = useLocale() as TLocale;
     return (
          <div className="w-full flex flex-col relative shadow-sm px-[1%] md:hidden ">
               <div className="w-full flex flex-row justify-between p-[5px] relative ">
                    <div className="w-[50px] h-[50px] border-[1.4px] border-main-blue-800 rounded-[100px] p-[2.5px] overflow-hidden cursor-pointer hover:border-main-secondary">
                         <MyImage image="/logo/logo.jpg" rounded="100px" />
                    </div>
                    <div className="w-auto flex flex-row gap-[5px] h-auto items-center">
                         { !showCategories ?
                         <i className="text-[24px] text-main-blue-800 cursor-pointer hover:text-main-secondary " onClick={() => setShowCategories(true)}><FiMenu /></i> :
                         <i className="text-[24px] text-main-blue-800 cursor-pointer hover:text-main-secondary " onClick={() => setShowCategories(false)}><RxCross2 /></i>}
                         {user ? 
                         <Link href={`${user.type === 'seller' ? '/seller' : '/'}`}><Image src={'/images/user-icon.png'} width={40} height={40} alt="profile icon" /></Link>:
                         <Link href={'/auth/login'} className="text-[0.8rem] font-medium text-white bg-main-orange-600 border-[1.2px] border-main-orange-600 rounded-[5px] py-[5px] px-[20px] transition-all duration-300 hover:bg-white hover:text-main-orange-600  ">{accountBtn}</Link>}
                         {/* <button className="text-[0.8rem] font-semibold text-white bg-main-secondary border-[1.5px] border-main-secondary rounded-[10px] py-[10px] px-[20px] text-nowrap transition-all duration-300 hover:bg-orange-400 ">{actionBtn}</button> */}
                    </div>
               </div>
               <div className={`absolute py-[5px] top-full left-0 flex flex-col items-center gap-[5px] p-5px bg-white w-full shadow-md ${showCategories ? "opacity-100" : "opacity-0"}`}>
               {categoryTypes.map(((group,index) => <div className="flex items-center justify-start gap-[5px] cursor-pointer w-[98%]  border-[1.3px] border-slate-200 p-[2.5px] mx-auto text-slate-500 hover:text-main-secondary hover:bg-slate-50 rounded-[5px] flex-1 text-center" key={`header-category-group-${index}`} >
                         <Image src={group.icon} width={50} height={50} className="aspect-[100/80] rounded-[2.5px]" alt={group.name[locale] || "en"}/>
                         <span className="text-[0.9rem]">{group.name[locale]}</span>
                    </div> ))}
                    {/* <span className="cursor-pointer w-[90%] text-[0.8rem] px-[10px] py-[2.5px] border-b-[1px] border-slate-100 mx-auto text-slate-500 hover:text-main-secondary">Contruction Machines</span>
                    <span className="cursor-pointer w-[90%] text-[0.8rem] px-[10px] py-[2.5px] border-b-[1px] border-slate-100 mx-auto text-slate-500 hover:text-main-secondary">Trucks</span>
                    <span className="cursor-pointer w-[90%] text-[0.8rem] px-[10px] py-[2.5px] border-b-[1px] border-slate-100 mx-auto text-slate-500 hover:text-main-secondary">Buses</span>
                    <span className="cursor-pointer w-[90%] text-[0.8rem] px-[10px] py-[2.5px] border-b-[1px] border-slate-100 mx-auto text-slate-500 hover:text-main-secondary">Cars</span> */}
               </div> 
          </div>
     )
}

const NavLink:React.FC<{name: string, dest:string}> = ({name,dest}) => {
     return (
          <Link 
          className="text-[0.8rem] hover:bg-main-blue-50 rounded-[20px] py-[5px] px-[10px] text-main-gray-900 hover:text-main-blue-950 transition-all duration-200 " 
          href={dest}>{name}</Link>
     )
}
export default Header