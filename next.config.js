/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  ...nextConfig,
  output: 'standalone',
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    if (isServer) {
      config.externals.push({
        bufferutil: 'bufferutil',
        'utf-8-validate': 'utf-8-validate',
      })
    }
    return config
  },
}
