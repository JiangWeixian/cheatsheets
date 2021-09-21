const path = require('path')
const withImages = require('next-images')
const withFonts = require('next-fonts')

module.exports = withFonts(
  withImages({
    webpack: config => {
      config.resolve.alias['~'] = path.join(__dirname, '')
      if (process.env.NODE_ENV === 'development') {
        config.resolve.alias.react = require.resolve('./node_modules/react')
      }
      return config
    },
    env: {
      IS_MOCK: true,
    },
  }),
)
