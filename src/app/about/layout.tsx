import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Car Rent System",
     description: "Rent any car you like easily and quickly",
};

export default  async function Layout({
children
}: Readonly<{
children: React.ReactNode;
}>) {
return (
     <>{children}</>
);
}