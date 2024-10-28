/** @type {import('next').NextConfig} */ 
// const withNextIntl = createNextIntlPlugin();
// /** @type {import('next').NextConfig} */
// const nextConfig = {};
 
// export default withNextIntl(nextConfig);


import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
      i18n: {
     locales: ['en', 'kin', 'fr'], // Supported locales
     defaultLocale: 'en', // Default locale when none is specified
     localeDetection: false, // Disable locale detection based on URL
    },
      images: {
      domains: ['picsum.photos', 'clickrwanda-real-estate.s3.us-east-1.amazonaws.com']
    }
  // Other Next.js configurations...
};

export default withNextIntl(nextConfig);
