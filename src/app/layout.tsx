import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import MainNotificationContainer from "@/components/Notifications/ManNotificationCard";
import { UserProvider } from "@/context/UserContext";
import fetchUserData from "@/util/authFunctions";
import { cookies } from "next/headers";
import { AppProvider } from "@/context/AppContext";
import { fetchAppData } from "@/util/DataFuncs";


export const metadata: Metadata = {
  title: "Car rent system",
  description: "Best platform to rent your car",
};

export default async function RootLayout({
  children,params
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const {locale} = params;
  const messages = await getMessages();

  const getUserData = async() => {
    const cookieStore =await  cookies();

    const token = (cookieStore).get('authToken')?.value;
    if(token){
      const user = await fetchUserData(token)
      if(user){
          return user;
      }
    }
    return null;
}

const appData = await fetchAppData();
const user = await getUserData();
  return (
    <html lang={locale}>
      <body className="max-w-[1512px] w-full h-auto mx-auto">
        <NextIntlClientProvider messages={messages}>
          <AppProvider appData={appData}>
            <UserProvider userData={user}>
              {children}
            </UserProvider>
          </AppProvider>
          <MainNotificationContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
