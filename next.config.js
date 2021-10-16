const path = require('path')
const withImages = require('next-images')
const withTM = require('next-transpile-modules')(['granen'])

module.exports = withTM(
  withImages({
    webpack: config => {
      config.resolve.alias['~'] = path.join(__dirname, '')
      // if (process.env.NODE_ENV === 'development') {
      //   config.resolve.alias.react = path.resolve(__dirname, './node_modules/react')
      // }
      return config
    },
    env: {
      IS_MOCK: true,
    },
  }),
)
