import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Car Rent System",
     description: "Rent any car you like easily and quickly",
};

export default  async function DashboardLayout({
children
}: Readonly<{
children: React.ReactNode;
}>) {
return (
     <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-gray-100 overflow-y-auto ">
          {children}
     </div>
);
}