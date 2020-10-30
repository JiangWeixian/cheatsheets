const path = require('path')
const withImages = require('next-images')
const withFonts = require('next-fonts')

module.exports = withFonts(
  withImages({
    webpack: config => {
      config.resolve.alias['~'] = path.join(__dirname, '')
      return config
    },
    env: {
      IS_MOCK: true,
    },
  }),
)
