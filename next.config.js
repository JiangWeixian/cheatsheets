const path = require('path')
const withImages = require('next-images')
const withTM = require('next-transpile-modules')(['granen'])
const fs = require('fs')

const updateOpenSearch = () => {
  console.log('Update open-search file')
  const filepath = path.resolve(__dirname, './public/open-search.xml')
  const defaultOpenSearch = fs.readFileSync(filepath).toString()
  const openSearch = defaultOpenSearch.replace(
    /ohmycheatsheet\.vercel\.app/g,
    process.env.NEXT_PUBLIC_VERCEL_URL,
  )
  return fs.writeFileSync(filepath, openSearch)
}

/**
 * @type {import('next').NextConfig}
 */
const config = {
  webpack: (config, context) => {
    config.resolve.alias['~'] = path.join(__dirname, '')
    if (process.env.NODE_ENV === 'development') {
      config.resolve.alias.react = path.resolve(__dirname, './node_modules/react')
    }
    console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
    config.plugins.push(
      new context.webpack.DefinePlugin({
        REPO_OWNER: JSON.stringify(process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER),
        HOMEPAGE: JSON.stringify(process.env.NEXT_PUBLIC_VERCEL_URL),
      }),
    )
    return config
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: process.env.NODE_ENV !== 'development',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
        has: [
          {
            type: 'query',
            key: 'q',
          },
        ],
      },
    ]
  },
}

updateOpenSearch()

module.exports = withTM(withImages(config))
