[![cheatsheets](https://user-images.githubusercontent.com/6839576/139080815-b8e556a0-fcca-41d0-83a1-0faffaa42be1.png)](https://github.com/ohmycheatsheet/cheatsheets)

***Built with ❤️ by [ohmycheatsheet](https://github.com/ohmycheatsheet/cheatsheets). Cheatsheets is a part of [ohmycheatsheet]() project, a self-host cheatsheet management app! It sync your github issues to website with friendly UI~***

## features

- 🚀 Easy and Fast develop
- 🔍 Search cheasheet with algolia
- 🌥️ Cool Website
  - ✨ Support code-share with url or image
- 🤖 Useful Assistants Tools
  - 📩 **Slack bot** - Support send your recently/some-day-your-created cheatsheets with **slack-bot**


### snapshots

<div align='center'>

![homepage](https://user-images.githubusercontent.com/6839576/167288880-0bfae6c1-5f91-4ce3-97df-20889c9cf71c.png)
*▲ cheatsheets-homepage*

</div>

## usage

### Deploy

#### vercel

1. Use this repo as template
2. New dataset from [algolia](https://www.algolia.com/)
3. Set below github repo secrets

     - `ALGOLIA_APPID=<ALGOLIA_APPID>` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
     - `ALGOLIA_APP_KEY=<ALGOLIA_APP_KEY>` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
     - `SLACK_WEBHOOK=<SLACK_WEBHOOK>` - check [actions-friday](https://github.com/ohmycheatsheet/actions-friday) usage

4. Deploy to Vercel'now, in [Vercel](https://vercel.com/) deployments settings, set below env variables as `Production & Preview & Development Environment Variables`
    
    [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)

    - `GITHUB_TOKEN`
    - `NEXT_PUBLIC_ALGOLIA_APPID` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
    - `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
    - `ALGOLIA_APP_KEY` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)

5. new `issue` on github'issue

#### netlify

1. Use this repo as template
2. New dataset from [algolia](https://www.algolia.com/)
3. Set below github repo secrets

     - `ALGOLIA_APPID=<ALGOLIA_APPID>` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
     - `ALGOLIA_APP_KEY=<ALGOLIA_APP_KEY>` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
     - `SLACK_WEBHOOK=<SLACK_WEBHOOK>` - check [actions-friday](https://github.com/ohmycheatsheet/actions-friday) usage

4. Deploy to Netlify'now, in [Netlify](https://vercel.com/) deployments settings, set below env variables as `Production & Preview & Development Environment Variables`
    
    [![Deploy with Netlify](https://vercel.com/button)](https://app.netlify.com/)

    - `GITHUB_TOKEN`
    - `NEXT_PUBLIC_ALGOLIA_APPID` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
    - `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
    - `ALGOLIA_APP_KEY` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)

5. new `issue` on github'issue

### Analytics

Collect page-view data, set env variable `GA_MEASUREMENT_ID` from `https://analytics.google.com/`