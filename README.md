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

![homepage](https://user-images.githubusercontent.com/6839576/142011320-168a96ac-f0b3-48fe-bca5-9e98efc83c2c.png)
*▲ cheatsheets-homepage*

</div>

<div align='center'>

![shareable-link](https://user-images.githubusercontent.com/6839576/142010587-20d213c9-fe1c-419b-968d-d26a920c039e.png)
*▲ share your code with url*

</div>

<div align='center'>

![share-cheatsheet-image](https://user-images.githubusercontent.com/6839576/142010804-2874e69a-f2e2-401c-8965-4cf98b5b1263.png)
*▲ share your code with image*

</div>

<div align='center'>

![manage-with-github-label](https://user-images.githubusercontent.com/6839576/142011083-57b835b8-e7ee-4f64-973d-62c6487b9689.png)
*▲ manage-with-github-label*

</div>

## usage

### vercel

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

### netlify

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