
import { notFound } from "next/navigation";
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const locales = ['en', 'kin', 'fr'];

export default getRequestConfig(async () => {
     // Retrieve the locale from the NEXT_LOCALE cookie
     const localeCookie = (await  cookies()).get('NEXT_LOCALE')?.value || 'en'; // Default to 'en' if the cookie is not set

     // Validate the locale from the cookie
     if (!locales.includes(localeCookie)) {
         notFound(); // Handle invalid locale
     }

     return {
          messages: (await import(`../messages/${localeCookie}.json`)).default,
          locale: localeCookie, // Return the locale being used
          locales, // Return all supported locales
     };
});