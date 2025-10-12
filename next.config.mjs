/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    output: 'export',
    distDir: 'out',
    images: {unoptimized:true},
    basePath: isProd ? '/stamp-calculator' : '',
    assetPrefix: isProd ? '/stamp-calculator' : ''
};

export default nextConfig;
