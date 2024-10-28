'use client';

import { ENotificationType } from "@/common/CommonTypes";
import { customLogout } from "@/util/authFunctions";
import { showMainNotification } from "@/util/NotificationFuncs";
import { useRouter } from "next/navigation";

const Page = () => {
     
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
          <>
               <h3>Dispatcher Dashboard</h3>
               <button className="p-[10px] text-blue-600 border border-blue-600 rounded-[5px] " onClick={logout}>Log out</button>
          </>
     )
}

export default Page;