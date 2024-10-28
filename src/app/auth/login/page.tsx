'use client';

import { ENotificationType } from "@/common/CommonTypes";
import ProviderCard from "@/components/Cards/ProviderCard";
import { customLogin } from "@/util/authFunctions";
import { showMainNotification } from "@/util/NotificationFuncs";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaApple, FaEye, FaEyeSlash, FaFacebook, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";

export default function Page () {
     const [credentials, setcredentials] = useState<{email:string, password: string}>({email:"", password: ""});
     const [showPassword, setShowPassword] = useState<boolean>(true);
     const [loading,setLoading] = useState(false);

     const router = useRouter()
     const moveBack = () => window.history.back();

     const submitForm = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
               setLoading(true);
               const result = await customLogin(credentials.email, credentials.password);

               if (!result) {
                    showMainNotification("Invalid credentials", ENotificationType.FAIL);
               } else {
                    showMainNotification("Login successful!!", ENotificationType.PASS);
                    const pathname = result === 'admin' ? '/dashboard' : result === 'dispatcher' ? '/dispatcher' : result === 'seller' ? '/seller' : '/'
                    return router.push(pathname);
               }
          } catch (error) {
               console.error("Error during login:", error);
               showMainNotification("Error logging in", ENotificationType.FAIL);
          }finally{
               setLoading(false);
          }
     }
     return (
          <div className="w-[80%] md:w-[60%] lg:w-[40%] bg-white rounded-[10px] p-[10px] flex flex-col items-center gap-[10px] relative ">
               <span onClick={() => moveBack()} className="absolute top-[10px] left-[10px] group flex items-center cursor-pointer gap-[5px]"><i className="text-[18px] w-[30px] h-[30px] flex items-center justify-center border-[1px] border-gray-400 text-gray-400 rounded-full"><IoArrowBack /></i><b className="font-mono text-gray-400 text-[0.85rem] opacity-0 group-hover:opacity-100 ">back</b></span>
               <div className="w-full flex flex-col items-center justify-start gap-[2px]">
                    <h3 className="text-main-primary text-[1.4rem] font-bold ">Login</h3>
                    <p className="text-gray-500 text-[0.8rem]">Fill in your credentials to login</p>
               </div>
               <form onSubmit={submitForm} className="w-[90%] flex flex-col items-center justify-start gap-[5px]">
                    <div className="w-full flex flex-col items-start justify-start gap-[2px] ">
                         <label htmlFor="login-email" className="text-[0.8rem] font-medium text-gray-600  ">Email:</label>
                         <input 
                              required
                              className="w-full bg-gray-50 border-[1.2px] border-gray-200 px-[10px] py-[5px] rounded-[5px] focus:border-main-secondary outline-none transition-all duration-150 "
                              type="email" 
                              name="login-email" 
                              id="login-email"  
                              onChange={(e) => setcredentials(prev => ({...prev, email:e.target.value}))} />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-[2px] ">
                         <label htmlFor="login-password" className="text-[0.8rem] font-medium text-gray-600  ">Password:</label>
                         
                         <div className="w-full relative">
                              <input 
                                   required
                                   className="w-full bg-gray-50 border-[1.2px] border-gray-200 px-[10px] py-[5px] rounded-[5px] focus:border-main-secondary outline-none transition-all duration-150 "
                                   type={showPassword? "text" :"password"} 
                                   name="login-password" 
                                   id="login-password" 
                                   onChange={(e) => setcredentials(prev => ({...prev, password:e.target.value}))} />
                                   {
                                        !showPassword ? 
                                        <i className="text-gray-500 text-[16px] absolute right-[5px] top-[50%] -translate-y-[50%] cursor-pointer hover:text-gray-700 " onClick={() => setShowPassword(true)}><FaEye /></i>
                                        :
                                        <i className="text-gray-500 text-[16px] absolute right-[5px] top-[50%] -translate-y-[50%] cursor-pointer hover:text-gray-700 " onClick={() => setShowPassword(false) } ><FaEyeSlash /></i>
                                   }
                              </div>
                         
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-[2px] ">
                         <button type="submit" className="bg-main-orange-600 text-white font-medium text-[0.85rem] py-[5px] px-[10px] border-[1.2px] border-main-orange-600 rounded-[5px] hover:bg-white hover:text-main-secondary transition-all duration-300 ">Login</button>
                    </div>
               </form>
               <div className="w-[90%] border-t-[1.4px] border-gray-300 relative  flex flex-col gap-[5px] ">
                    <span className="text-[0.9rem] font-medium text-gray-300 absolute -top-[15px] rounded-full left-[50%] -translate-x-[50%] bg-white p-[4px] ">OR</span>
                    <p className="text-[0.8rem] mt-[5px] font-medium text-gray-600">Continue with:</p>
                    <div className="w-full flex items-center justify-evenly py-[5px] ">
                         <ProviderCard name="Google" icon={<i className="text-[24px] cursor-pointer "><FcGoogle/></i>} action={() => signIn('google')} />
                         <ProviderCard name="Apple" icon={<i className="text-[24px] text-[#555555] cursor-pointer "><FaApple/></i>} action={() => signIn('apple')} />
                         <ProviderCard name="Facebook" icon={<i className="text-[24px] text-blue-600 cursor-pointer "><FaFacebook /></i>} action={() => signIn('facebook')} />
                         <ProviderCard name="Microsoft" icon={<i className="text-[24px] text-gray-600 cursor-pointer "><FaMicrosoft /></i>} action={() => signIn('azure-ad')} />
                         
                    </div>
               </div>
               <div className="w-full flex items-center justify-end gap-[10px]">
                    <p className="text-[0.8rem] text-gray-600 font-mono " >Don&#39;t have an account.</p>
                    <Link href={'/auth/signup'} className="border-[1.3px] border-main-secondary text-main-secondary rounded-[5px] text-[0.8rem] font-mono py-[5px] px-[10px] " >Sign Up</Link>
               </div>
               {loading && <p className="text-orange-700 text-[0.9rem]  ">Loading...</p>}
          </div>
     )
}

