const path = require('path')
const withImages = require('next-images')
const fs = require('fs')
const gitUrlParse = require('git-url-parse')

/**
 * @description update `open-search.yaml`, only on valiable on ci mode
 */
const updateOpenSearch = () => {
  console.log('Update open-search file')
  const filepath = path.resolve(__dirname, './public/open-search.xml')
  const defaultOpenSearch = fs.readFileSync(filepath).toString()
  if (process.env.VERCEL) {
    const openSearch = defaultOpenSearch.replace(
      /ohmycheatsheet\.vercel\.app/g,
      process.env.NEXT_PUBLIC_VERCEL_URL,
    )
    return fs.writeFileSync(filepath, openSearch)
  }
  if (process.env.NETLIFY) {
    const openSearch = defaultOpenSearch.replace(
      /https:\/\/ohmycheatsheet\.vercel\.app/g,
      process.env.URL,
    )
    return fs.writeFileSync(filepath, openSearch)
  }
}

/**
 * @description define process.env.VARIABLE_NAME to constants
 * @example 'process.env.NEXT_PUBLIC_REPO_OWNER' -> 'ohmycheatsheet'
 */
const define = () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      'process.env.NEXT_PUBLIC_REPO_OWNER': JSON.stringify('ohmycheatsheet'),
      'process.env.NEXT_PUBLIC_REPO_NAME': JSON.stringify('cheatsheets'),
      'process.env.NEXT_PUBLIC_URL': JSON.stringify('https://ohmycheatsheet.vercel.app'),
    }
  }
  if (process.env.NETLIFY) {
    console.log('platform', 'netlify')
    console.log('parse git url', process.env.REPOSITORY_URL)
    const { owner, name } = gitUrlParse(process.env.REPOSITORY_URL)
    // https://docs.netlify.com/configure-builds/environment-variables/#git-metadata
    const env = {
      'process.env.NEXT_PUBLIC_REPO_NAME': JSON.stringify(name),
      'process.env.NEXT_PUBLIC_REPO_OWNER': JSON.stringify(owner),
      // e.g. https://www.petsofnetlify.com.
      'process.env.NEXT_PUBLIC_URL': JSON.stringify(process.env.URL),
      'process.env.GA_MEASUREMENT_ID': JSON.stringify(process.env.GA_MEASUREMENT_ID),
    }
    console.log(env)
    return env
  }
  if (process.env.VERCEL) {
    console.log('platform', 'vercel')
    // https://vercel.com/docs/concepts/projects/environment-variables
    const env = {
      'process.env.NEXT_PUBLIC_REPO_OWNER': JSON.stringify(
        process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER,
      ),
      'process.env.NEXT_PUBLIC_REPO_NAME': JSON.stringify(
        process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG,
      ),
      'process.env.GA_MEASUREMENT_ID': JSON.stringify(process.env.GA_MEASUREMENT_ID),
      'process.env.NEXT_PUBLIC_HOSTNAME': JSON.stringify(process.env.NEXT_PUBLIC_VERCEL_URL),
      'process.env.NEXT_PUBLIC_URL': JSON.stringify(
        `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
      ),
    }
    console.log(env)
    return env
  }
}

/**
 * @type {import('next').NextConfig}
 */
const config = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: process.env.NODE_ENV !== 'development',
  },
  webpack: (config, context) => {
    config.resolve.alias['~'] = path.join(__dirname, '')
    if (process.env.NODE_ENV === 'development') {
      config.resolve.alias.react = path.resolve(__dirname, './node_modules/react')
    }
    config.plugins.push(new context.webpack.DefinePlugin(define()))
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

if (process.env.CI) {
  updateOpenSearch()
}

module.exports = withImages(config)
