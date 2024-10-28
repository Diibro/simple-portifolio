'use client';

import { IUser } from "@/common/Interfaces";
import Endpoints from "@/services/Endpoints";
import { ClientServer } from "@/services/Server";
import Image from "next/image";
import { useEffect, useState } from "react";

const SellersPage = () => {
     const [sellers,setSellers] = useState<Array<IUser>>([])
     const fetchSellers = async () => {
          const res = await ClientServer.get(`${Endpoints.user}?type=seller`);
          if(res) {
               setSellers(res);
          }
     }

     useEffect(() => {
          (async() => await fetchSellers())();
     }, [])
     return (
          <div className="w-full flex flex-col items-center justify-start" >
               <div className="w-full flex flex-row justify-between items-center py-[10px] px-[20px] ">
                    <h2 className="text-[1.8rem] font-extrabold text-main-text ">Sellers</h2>
               </div>
               <div className="w-full flex flex-row flex-wrap items-start justify-center gap-[10px] my-[10px]  ">
               </div>
               <SellersContainer sellers={sellers} />
          </div>
     )
}

const SellersContainer = ({sellers}: {sellers:Array<IUser>}) => {
     return(
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[10px] border-[1.3px] rounded-[5px] border-gray-400 p-[5px] ">
               {sellers.map((seller,index) => <SellerRow seller={seller} key={`dashboard-seller-row-${index}`} />)}
          </div>
     )
}

const SellerRow = ({seller}:{seller:IUser}) => {
     return (
          <div className="w-full flex gap-[5px] items-center justify-between border-[1.3px] border-gray-400 rounded-[2.5px] p-[5px] ">
               <Image src={'/images/user-icon.png'} width={40} height={40} alt={seller.name} className="rounded-full p-[2.5px] "  />
               <div className="flex items-center text-gray-600 gap-[5px] flex-wrap">
                    <p className="text-[0.8rem]" >{seller.email}</p>
                    {
                         seller.status === "pending" ? 
                         <p className="text-[0.8rem] text-main-secondary ">Pending</p>:
                         seller.status === "Approved" ?
                         <p className="text-0.8rem text-green-600"  >Approved</p>:
                         <p className="text-[0.8rem] text-main-warningError ">Rejected</p>

                    }
               </div>
               <div className="flex items-center gap-[5px]">
                    <button className="py-[5px] px-[10px] text-[0.8rem]  rounded-[2.5px] bg-main-bright-blue text-white " >View</button>
                    <button className="py-[5px] px-[10px] text-[0.8rem]  rounded-[2.5px] bg-main-orange-600 text-white " >{seller.status === "Approved" ? "Reject" :"Approve"}</button>
               </div>
          </div>
     )
}

export default SellersPage;