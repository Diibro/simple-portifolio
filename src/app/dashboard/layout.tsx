
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardPage from "@/components/dashboard/DashboardPage";
import fetchUserData from "@/util/authFunctions";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
     title: "Car Rent Dashboard",
     description: "Discover the best and trusted real estate property in Rwanda.",
};

export default  async function DashboardLayout({
     children
     }: Readonly<{
     children: React.ReactNode;
     }>) {
          const checkRole = async() => {
               const cookieStore = cookies();

               const token = cookieStore.get('authToken')?.value;
               if(token){
                    const user = await fetchUserData(token)
                    if(user && user.role === 'admin'){
                         return;
                    }
               }
               return redirect('/auth/login');
          
          }

          await checkRole();

     return (
          <html lang={"en"}>
               <body className="max-w-[1512px] w-screen h-screen flex flex-col-reverse md:flex-row items-center justify-between md:justify-evenly md:p-[10px] py-[5px] overflow-hidden">
                    <DashboardHeader />
                    <DashboardPage>
                         {children}
                    </DashboardPage>
               </body>
          </html>
     );
}