'use client';

import { useTranslations } from "next-intl";
import MyImage from "./Images/MyImage"
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
     const t = useTranslations('footer');
     const content = t.raw("about");
     const supportLinks = t.raw("supportLinks");
     const contactDetails = t.raw("location");
     const isLargerThanTablet = useMediaQuery({query: '(min-width: 768px)' })
     return (
          <div className="w-full py-[10px] px-[2%] bg-main-primary flex flex-col items-center gap-[5px] ">
               <div className="w-full flex flex-row items-start flex-wrap justify-between gap-[10px] py-[10px] ">
                    <div className="w-[46%] md:w-[40%] flex flex-row items-start gap-[5px] ">
                         <div>
                              {
                                   isLargerThanTablet ? 
                                   <div className="w-[100px] h-[100px] border-[1.3px] border-slate-300 rounded-[100px] p-[2.5px] overflow-hidden cursor-pointer hover:border-main-secondary">
                                        <MyImage image="/logo/logo.jpg" rounded="100px" />
                                   </div>
                                   :null
                              }
                         </div>
                         <div>
                              <h3 className="text-slate-100 text-[1.1rem] font-bold ">{content.title}</h3>
                              <p className="text-[0.8rem] text-slate-200 text-start ">{content.description}</p>
                         </div>
                    </div>
                    <div className=" w-[46%] md:w-[25%] flex flex-col gap-[5px]">
                         <h3 className="w-full text-[1.1rem]  font-bold text-slate-200">{contactDetails.name}</h3>
                         <p className="text-slate-200 text-[0.85rem]">{contactDetails.message}</p>
                         <Link className="text-slate-300 hover:text-main-secondary font-bold text-[0.85rem] " href={`mailto:${contactDetails.email}`}>Email: {contactDetails.email}</Link>
                         <Link className="text-slate-300 hover:text-main-secondary font-bold text-[0.85rem] " href={`tel:${contactDetails.phone}`}>Phone: {contactDetails.phone}</Link>
                         <p className="text-slate-300 hover:text-main-secondary font-bold text-[0.85rem] w-full flex flexr-w gap-[5px] cursor-pointer "><i className="text-slate-500"><FaLocationDot /></i>  {contactDetails.location}</p>
                    </div>
                    <div className="  w-[46%] md:w-[25%] flex flex-col gap-[10px]">
                         <h3 className="w-full text-[1.1rem]  font-bold text-slate-200">{supportLinks.name}</h3>
                         <div className="flex flex-col items-start w-full gap-[10px] " >
                              {supportLinks.links.map((link:{name:string, dest:string},index:number) => <Link className="text-slate-300 text-[0.85rem] font-medium hover:text-main-secondary " key={`footer-support-link-${index}`} href={link.dest}>{link.name}</Link>)}
                         </div>
                    </div>
               </div>
               <div className="w-full flex flex-row items-start flex-wrap justify-center border-t-[1.5px] py-[10px] border-slate-600">
                    <p className="text-slate-300 text-center font-semibold text-[0.75rem]">Copyright &#169; 2024 All rights reserved.</p>
               </div>
          </div>
     )
}

export default Footer