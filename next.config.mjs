/** @type {import('next').NextConfig} */ 
// const withNextIntl = createNextIntlPlugin();
// /** @type {import('next').NextConfig} */
// const nextConfig = {};
 
// export default withNextIntl(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
      domains: ['picsum.photos', 'clickrwanda-real-estate.s3.us-east-1.amazonaws.com']
    }
  // Other Next.js configurations...
};

export default nextConfig;
