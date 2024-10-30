'use client';

import { ENotificationType } from "@/common/CommonTypes";
import { IUser } from "@/common/Interfaces";
import Endpoints from "@/services/Endpoints";
import { ClientServer } from "@/services/Server";
import { showMainNotification } from "@/util/NotificationFuncs";
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
               <div className="w-full flex flex-row justify-between items-center py-[5px] px-[20px] ">
                    <h2 className="text-[1.8rem] font-extrabold text-main-text ">Registered Sellers</h2>
               </div>
               <SellersContainer sellers={sellers} />
          </div>
     )
}

const SellersContainer = ({sellers}: {sellers:Array<IUser>}) => {
     return(
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[10px]  rounded-[5px]">
               {sellers.map((seller,index) => <SellerRow seller={seller} key={`dashboard-seller-row-${index}`} />)}
          </div>
     )
}

const SellerRow = ({seller}:{seller:IUser}) => {
     const [loading, setLoading] = useState<boolean>(false)
     const changeSellerStatus = async (status: string) => {
          setLoading(true)
          const res = await ClientServer.patch({...seller, status}, `${Endpoints.user}/${seller.id}`);
          if(res) {
               showMainNotification(`Seller ${status}`, ENotificationType.PASS);
          }else {
               showMainNotification(`Error updating seller. Please try again later`, ENotificationType.FAIL);
          }
          return setLoading(false);
     }
     return (
          <div className="w-full flex gap-[5px] aspect-auto items-center justify-between shadow-md shadow-gray-400 rounded-[5px] p-[10px] relative ">
               {loading && <p className="absolute top-[10px] right-[10px] text-main-orange-400 font-mono text-[0.9rem] ">Loading...</p>}
               <div className="w-[70%] flex flex-col gap-[5px] ">
                    <p className="text-gray-800 text-[0.8rem] w-full " > <span>Email: </span> <b>{seller.email}</b></p>
                    <p className="text-gray-800 text-[0.8rem] w-full " > <span>Phone: </span> <b>{seller.phone}</b></p>
                    <p className="text-gray-800 text-[0.8rem] w-full ">
                         <span>Status: </span>
                         {
                              seller.status === "pending" ? 
                              <b className=" text-main-secondary ">Pending</b>:
                              seller.status === "Approved" ?
                              <b className=" text-green-600"  >Approved</b>:
                              <b className=" text-main-warningError ">Rejected</b>

                         }
                    </p>
                    <div className="w-full flex items-center gap-[5px]">
                         {seller.status === "pending" && <><button className="py-[5px] px-[10px] text-[0.8rem]  rounded-[2.5px] bg-main-orange-600 text-white " onClick={async() => await changeSellerStatus('Rejected')} > Reject</button> <button onClick={async() => await changeSellerStatus('Approved')} className="py-[5px] px-[10px] text-[0.8rem]  rounded-[2.5px] bg-green-600 text-white " >Approve</button> </>}
                         {seller.status === "Rejected" && <button onClick={async() => await changeSellerStatus('Approved')} className="py-[5px] px-[10px] text-[0.8rem]  rounded-[2.5px] bg-green-600 text-white " >Approve</button> }
                         {seller.status === "Approved" && <button className="py-[5px] px-[10px] text-[0.8rem]  rounded-[2.5px] bg-main-orange-600 text-white " onClick={async() => await changeSellerStatus('Rejected')} > Inactivate</button>}
                    </div>
               </div>
               <Image src={'/images/user-icon.png'} width={100} height={100} alt={seller.name} className="rounded-full p-[2.5px] width-[30%] h-auto " />
          </div>
     )
}

export default SellersPage;