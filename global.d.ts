declare module 'markdown-it-todo'
declare module 'react-responsive-masonry'
declare const dataLayer

declare class ClipboardItem {
  constructor(data: { [mimeType: string]: Blob })
}
declare global {
  interface Window {
    gtag: any
  }
  namespace NodeJS {
    interface ProcessEnv {
      // inject on platform vercel: @see {@link https://vercel.com/docs/concepts/projects/environment-variables}
      NEXT_PUBLIC_VERCEL_URL: string
      NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER: string
      NEXT_PUBLIC_REPO_NAME: string
      VERCEL: boolean
      NEXT_PUBLIC_URL: string
      // inject on platform netlify
      URL: string
      NETLIFY: boolean
      REPOSITORY_URL: string
      CI: boolean
      // require by omcs
      NEXT_PUBLIC_ALGOLIA_APPID: string
      NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: string
      ALGOLIA_APP_KEY: string
      GITHUB_TOKEN: string
      // google analytics id
      GA_MEASUREMENT_ID: string
    }
  }
}

export {}
