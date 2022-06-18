// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url?: string) => {
  window.gtag('config', process.env.GA_MEASUREMENT_ID, {
    page_path: url,
  })
}
