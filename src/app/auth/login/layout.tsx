import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Car Rent System",
     description: "Rent any car you like easily and quickly. Get tarted by logging in",
};

export default  async function DashboardLayout({
children
}: Readonly<{
children: React.ReactNode;
}>) {
     
return (
     <>
          {children}
     </>
);
}