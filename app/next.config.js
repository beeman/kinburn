/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  ...nextConfig,
  env: {
    REACT_APP_MINT: process.env.REACT_APP_MINT,
    REACT_APP_PROGRAM_ID: process.env.REACT_APP_PROGRAM_ID,
    REACT_APP_SOLANA_RPC_HOST: process.env.REACT_APP_SOLANA_RPC_HOST,
  }}
