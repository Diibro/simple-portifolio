'use client';

import { ENotificationType } from "@/common/CommonTypes";
import { CUser } from "@/common/Entities";
import ProviderCard from "@/components/Cards/ProviderCard";
import Endpoints from "@/services/Endpoints";
import { ClientServer } from "@/services/Server";
import { showMainNotification } from "@/util/NotificationFuncs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaApple, FaEye, FaEyeSlash, FaFacebook, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";

const Page = () => {
     const [user,setUser] = useState<CUser>({
          email: "",
          name: "",
          phone: "",
          type: 'client',
          password: "",
          status: 'pending',
          createdAt: new Date()
     })
     const [showPassword, setShowPassword] = useState<boolean>(false);
     const [loading,setLoading] = useState(false);

     const moveBack = () => window.history.back();
     const router = useRouter();

     const submitForm = async (e: React.FormEvent) => {
          e.preventDefault();
          setLoading(true);
          if(user) {
               const newUser: CUser  = {
                    ...user,
                    name: user.email.split('@')[0]
               }

               const res = await ClientServer.post(newUser, Endpoints.user);
               if(res) {
                    showMainNotification(`Account created with email: ${res.email}, name: ${res.name}`, ENotificationType.PASS);
                    router.push('/auth/login');
               }
               else showMainNotification("Error creating the account. Please contact support", ENotificationType.FAIL);
          }else {
               showMainNotification("Invalid Information. Please try again", ENotificationType.WARNING);
          }
          return setLoading(false);
     }

     return (
          <div className="w-[80%] md:w-[60%] lg:w-[40%] bg-white rounded-[10px] p-[10px] flex flex-col items-center gap-[10px] relative ">
               <span onClick={() => moveBack()} className="absolute top-[10px] left-[10px] group flex items-center cursor-pointer gap-[5px]"><i className="text-[18px] w-[30px] h-[30px] flex items-center justify-center border-[1px] border-gray-400 text-gray-400 rounded-full"><IoArrowBack /></i><b className="font-mono text-gray-400 text-[0.85rem] opacity-0 group-hover:opacity-100 ">back</b></span>
               <div className="w-full flex flex-col items-center justify-start gap-[2px]">
                    <h3 className="text-main-primary text-[1.4rem] font-bold ">Sign Up</h3>
                    <p className="text-gray-500 text-[0.8rem]">Fill in the form below to sign up.</p>
               </div>
               <form onSubmit={submitForm} className="w-[90%] flex flex-col items-center justify-start gap-[5px]">
                    <div className="w-full flex flex-col items-start justify-start gap-[2px] ">
                         <label htmlFor="signup-email" className="text-[0.8rem] font-medium text-gray-600  ">Email:</label>
                         <input 
                              required
                              className="w-full bg-gray-50 border-[1.2px] border-gray-200 px-[10px] py-[5px] rounded-[5px] focus:border-main-secondary outline-none transition-all duration-150 text-[0.85rem] text-gray-500  "
                              type="email" 
                              name="signup-email" 
                              id="signup-email"  
                              onChange={(e) => setUser(prev => ({...prev, email:e.target.value}))} />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-[2px] ">
                         <label htmlFor="signup-phone" className="text-[0.8rem] font-medium text-gray-600  ">Phone:</label>
                         <input 
                              required
                              className="w-full bg-gray-50 border-[1.2px] border-gray-200 px-[10px] py-[5px] rounded-[5px] focus:border-main-secondary outline-none transition-all duration-150 text-[0.85rem] text-gray-500  "
                              type="phone" 
                              name="signup-phone" 
                              id="signup-phone"  
                              onChange={(e) => setUser(prev => ({...prev, phone:e.target.value}))} />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-[2px] ">
                         <label htmlFor="signup-type" className="text-[0.8rem] font-medium text-gray-600  ">Account Type:</label>
                         <select 
                              required
                              className="w-full bg-gray-50 border-[1.2px] border-gray-200 px-[10px] py-[5px] rounded-[5px] focus:border-main-secondary outline-none transition-all duration-150 text-[0.85rem] text-gray-500 "
                              name="signup-type" 
                              id="signup-type"  
                              onChange={(e) => setUser(prev => ({...prev, type:e.target.value}))}>
                                   <option value="">select account type...</option>
                                   <option value="seller">Seller</option>
                                   <option value="client">Client</option>
                              </select>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-[2px] ">
                         <label htmlFor="signup-password" className="text-[0.8rem] font-medium text-gray-600  ">Password:</label>
                         <div className="w-full relative">
                              <input 
                                   required
                                   className="w-full bg-gray-50 border-[1.2px] border-gray-200 px-[10px] py-[5px] rounded-[5px] focus:border-main-secondary outline-none transition-all duration-150 text-[0.85erem] text-gray-500 "
                                   type={showPassword? "text" :"password"} 
                                   name="signup-password" 
                                   id="signup-password" 
                                   onChange={(e) => setUser(prev => ({...prev, password:e.target.value}))} 
                              />
                              {
                                   !showPassword ? 
                                   <i className="text-gray-500 text-[16px] absolute right-[5px] top-[50%] -translate-y-[50%] cursor-pointer hover:text-gray-700 " onClick={() => setShowPassword(true)}><FaEye /></i>
                                   :
                                   <i className="text-gray-500 text-[16px] absolute right-[5px] top-[50%] -translate-y-[50%] cursor-pointer hover:text-gray-700 " onClick={() => setShowPassword(false) } ><FaEyeSlash /></i>
                              }
                         </div>
                         
                    </div>
                    
                    <div className="w-full flex flex-col items-start justify-start gap-[2px] ">
                         <button type="submit" className="bg-main-orange-600 text-white font-medium text-[0.85rem] py-[5px] px-[10px] border-[1.2px] border-main-orange-600 rounded-[5px] hover:bg-white hover:text-main-secondary transition-all duration-300 ">Sign Up</button>
                    </div>
               </form>
               <div className="w-[90%] border-t-[1.4px] border-gray-300 relative flex flex-col gap-[5px]">
                    <span className="text-[0.9rem] font-medium text-gray-300 absolute -top-[15px] rounded-full left-[50%] -translate-x-[50%] bg-white p-[4px] ">OR</span>
                    <p className="text-[0.85rem] font-medium text-gray-500 ">Continue with:</p>
                    <div className="w-full flex items-center justify-evenly py-[5px] ">
                         <ProviderCard name="Google" icon={<i className="text-[24px] cursor-pointer "><FcGoogle/></i>} action={() => {}} />
                         <ProviderCard name="Apple" icon={<i className="text-[24px] text-[#555555] cursor-pointer "><FaApple/></i>} action={() => {}} />
                         <ProviderCard name="Facebook" icon={<i className="text-[24px] text-blue-600 cursor-pointer "><FaFacebook /></i>} action={() => {}} />
                         <ProviderCard name="Microsoft" icon={<i className="text-[24px] text-gray-600 cursor-pointer "><FaMicrosoft /></i>} action={() => {}} />
                    </div>
               </div>
               <div className="w-full flex items-center justify-end gap-[5px]">
                    <p className="text-[0.8rem] text-gray-600 font-mono " >Already have an account.</p>
                    <Link href={'/auth/login'}  className="border-[1.3px] border-main-secondary text-main-secondary rounded-[5px] text-[0.8rem] font-mono py-[5px] px-[10px] ">Login</Link>
               </div>
               {loading && <p className="text-orange-700 text-[0.9rem]  ">Loading...</p>}
          </div>
     )
}

export default Page;