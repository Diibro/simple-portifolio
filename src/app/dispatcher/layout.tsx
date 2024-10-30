import fetchUserData from "@/util/authFunctions";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
     title: "Car Rent System",
     description: "Rent any car you like easily and quickly",
};

export default  async function DashboardLayout({
     children
     }: Readonly<{
     children: React.ReactNode;
     }>) {
          const checkRole = async() => {
               const cookieStore = cookies();

               const token = (await cookieStore).get('authToken')?.value;
               if(token){
                    const user = await fetchUserData(token)
                    if(user && user.role === 'dispatcher'){
                         return;
                    }
               }
               return redirect('/auth/login');
          
          }

          await checkRole();
     return (
          <>
               {children}
          </>
     );
}