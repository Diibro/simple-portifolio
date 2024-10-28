'use client';

import { ENotificationType } from "@/common/CommonTypes";
import { CStaff } from "@/common/Entities";
import { IFileUploader } from "@/common/Interfaces";
import FileUploader from "@/components/FileUploader";
import MyImage from "@/components/Images/MyImage";
import Endpoints from "@/services/Endpoints";
import { ClientServer } from "@/services/Server";
import { showMainNotification } from "@/util/NotificationFuncs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface IDispatcherRow {
     dispatcher: CStaff
}

const DispatchersPage = () => {
     const [showAddForm,setShowAddForm] = useState<boolean>(false);
     const [dispatchers,setDispatchers] = useState<Array<CStaff>>([]);
     
     const fetchData = async () => {
          const res = await ClientServer.getWithParams(`${Endpoints.staff}`,{role: 'dispatcher'} );
          if(res && res.length && Array.isArray(res)) {
               setDispatchers(res);
          }
     }

     const updateDispatchers = (disp: CStaff) => {
          return setDispatchers(prev => [disp, ...prev]);
     }

     useEffect(() => {
          (async () => await fetchData())();
     },[])
     return (
          <div className="w-full flex flex-col items-center justify-start" >
               <div className="w-full flex flex-row justify-between items-center py-[10px] px-[20px] ">
                    <h2 className="text-[1.8rem] font-extrabold text-main-text ">Dispatchers</h2>
                    {!showAddForm ? <button onClick={() => setShowAddForm(true)} className="px-[30px] py-[7.5px] bg-main-secondary text-white rounded-[10px] text-[0.9rem] border-[1.3px] border-main-secondary hover:bg-white hover:text-main-secondary transition-all duration-150 ">New Dispatcher</button> : null}
               </div>
               <div className="w-full flex flex-row flex-wrap items-start justify-center gap-[10px] my-[10px]  ">
                    {/* {showAddForm && <AddDispatcherForm cb={(res) =>  { 
                         updateDispatchers(res);
                         setShowAddForm(false);
                    }} />
                    } */}
                    {
                         showAddForm ?
                         <div className=" w-full md:w-[40%] lg:w-[35%] p-[10px] rounded-[10px] border-slate-300 border-[1.4px] ">
                              <div className="w-full flex flex-row items-center justify-center p-[5px]"><i onClick={() => setShowAddForm(false)} className="text-main-secondary text-[24px] cursor-pointer"><RxCross2 /></i></div>
                              <AddDispatcherForm cb={(res) =>  { 
                                   updateDispatchers(res);
                                   setShowAddForm(false);
                              }} />
                         </div> :
                         null
                    }

                    <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col items-start gap-[5px] flex-1 bg-gray-100 p-[10px] rounded-[10px] ">
                         <h4 className="w-full text-gray-500 text-[1.2rem] font-bold">Registered Dispatchers</h4>
                         {
                              dispatchers && dispatchers.length ? 
                                   dispatchers.map((dispatcher, index) => <DispatcherRow key={`dashboard-dispatcher-row-${index}`} dispatcher={dispatcher} /> )
                              : <p className="text-[0.9rem] text-gray-400 font-semibold ">No Categories found</p>
                         }
                    </div>
               </div>
               
          </div>
     )
}

const DispatcherRow:React.FC<IDispatcherRow> = ({dispatcher}) => {
     const toggleStatus = async () => {
          const res = await ClientServer.patch({...dispatcher, status: dispatcher.status === 'active' ? 'inactive' : 'active' }, `${Endpoints.staff}/${dispatcher.id}`);
          console.log(res);

     }
     return (
          <div className="w-full bg-white flex flex-row items-center justify-between flex-wrap border-[1px] border-slate-100 py-[5px] px-[10px] rounded-[10px] gap-[10px] ">
               {dispatcher.icon && <div className="w-[50px] h-[50px] rounded-[5px] overflow-hidden"><MyImage image={dispatcher.icon} rounded="10px" /></div>}
               <h4 className="text-main-primary text-[0.8rem] font-bold">{dispatcher.email}</h4>
               {
                    dispatcher.status === "active" ? <p className="text-[0.9rem] text-green-700 text-main-hightlight font-bold ">Active</p> : <p className="text-[0.9rem] font-bold text-main-warningError  ">Inactive</p>
               }
               <button className="px-[15px] py-[5px] bg-white text-main-secondary rounded-[10px] text-[0.8rem] border-[1.3px] border-main-secondary hover:text-main-secondary hover:bg-slate-100 transition-all duration-150 " onClick={toggleStatus} >{dispatcher.status === 'active' ? "Inactivate" : "Activate"}</button>
               <button className="px-[15px] py-[5px] bg-red-600 text-white rounded-[10px] text-[0.8rem] border-[1.3px] border-red-600  hover:bg-red-500 transition-all duration-150 " >Delete</button>
          </div>
     )
}

interface IAddDispatcherForm {
     cb: (dispatcher: CStaff) => unknown
}

const AddDispatcherForm:React.FC<IAddDispatcherForm> = ({cb}) => {
     const [dispatcher,setDispatcher] = useState<CStaff>({
          email: "",
          icon: "",
          password: "",
          role: "dispatcher",
          status: 'active',
          createdAt: new Date(),
     });
     const [uploadOptions,setUploadOptions ] = useState<{content: IFileUploader | undefined, show:boolean}>({content: undefined, show: false});

     const save = async (e: React.FormEvent) => {
          e.preventDefault();
          if(dispatcher.icon?.length) {
               const res = await ClientServer.post(dispatcher, Endpoints.staff);
               if(res){ 
                    showMainNotification('Saved new dispatcher successfully!', ENotificationType.PASS);
                    return cb(dispatcher)
               }else {
                    showMainNotification('Error adding new Dispatcher', ENotificationType.FAIL);
               }
          }else {
               showMainNotification("Please choose a profile icon", (ENotificationType.WARNING));
          }

     }
     return (
          <div className="w-full flex flex-col items-start gap-[5px]">
               <h4 className="w-full text-slate-50 bg-blue-700 p-[10px] rounded-[10px] font-bold text-[0.9rem] ">Add New Dispatcher</h4>
               <form className={`w-full flex flex-col gap-[10px] `} onSubmit={save} >
                    <div className=" w-full flex flex-col gap-[2px]">
                         <label htmlFor="dispatcher-email-input" className="text-gray-600 text-[0.8rem] ">Email: </label>
                         <input type="text" name="dispatcher-email-input" required id="dispatcher-email-input" onChange={(e) => setDispatcher(prev => ({...prev, email: e.target.value}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" />
                    </div>
                    <div className=" w-full flex flex-col gap-[2px]">
                         <label htmlFor="dispatcher-password-input" className="text-gray-600 text-[0.8rem] ">Password: </label>
                         <input type="password" name="dispatcher-password-input" id="dispatcher-password-input" onChange={(e) => setDispatcher(prev => ({...prev, password: e.target.value}))} className="w-full border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px]" />
                    </div>
                    <div className="w-full  border-gray-200 border-[1.3px] bg-gray-100 rounded-[5px] outline-none p-[5px] flex flex-row items-start justify-start gap-[10px]">
                         <button 
                              type="button" 
                              className="px-[15px] py-[5px] text-[0.8rem] bg-slate-500 text-slate-50 rounded-[5px] hover:bg-slate-700 "
                              onClick={() => setUploadOptions({content: {
                                        title: "Upload Profile icon", 
                                        close: () => setUploadOptions({content:undefined, show: false}),
                                        cb: (res) => setDispatcher((prev) => ({...prev, icon: res})) }, show: true})}
                         >Choose Icon</button>
                         {dispatcher.icon && <Image src={dispatcher.icon} width={100} height={100} alt="dispatcher-icon"  />}
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-[5px]">
                         <button type="submit" className=" w-full px-[30px] py-[7.5px] bg-blue-600 text-white rounded-[10px] text-[0.8rem] border-[1.3px] border-blue-600 hover:bg-blue-500  transition-all duration-150 ">Save Dispatcher</button>
                    </div>
               </form>
               {
                    uploadOptions?.show && uploadOptions.content ? 
                         <FileUploader content={uploadOptions.content} />
                    :null
               }
          </div>
     )
} 
export default DispatchersPage;