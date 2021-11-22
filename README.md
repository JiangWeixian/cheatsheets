[![cheatsheets](https://user-images.githubusercontent.com/6839576/139080815-b8e556a0-fcca-41d0-83a1-0faffaa42be1.png)](https://github.com/ohmycheatsheet/cheatsheets)

*built with ❤️ by [ohmycheatsheet](https://github.com/ohmycheatsheet/cheatsheets)*

*cheatsheets is a part of [ohmycheatsheet]() project, a self-host cheatsheet management app!*

> **WARNING**
> 
> *`2021/11/16 22:22:05` This app still under beta version~*

## features

- 🚀 Easy and Fast develop
- 🌥️ Cool Website
  - ✨ Support code-share with url or image
- 🤖 Useful Assistants Tools
  - 📩 **Slack bot** - Support review your recently/some-day-your-learned cheatsheets with **slack-bot**
  - 🕸️ **[ctrlc](https://github.com/ohmycheatsheet/ctrlc)** - a chrome extension for pin `cheatsheet` from website like `stackoverflow`
  - 🚧 **[ctrlhub]()** - a desktop management app help you manage cheatsheet like pro
  - 🚧 **[ctrlai]()** - a deeplearning model help you review your cheatsheets


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

> **💡  NOTE**  
*After deploy to real world, install [`ohmycheatsheet`](https://github.com/apps/ohmycheatsheet/installations/new) github app to your `cheatsheets` repo first.*

1. Use this repo as template
2. New dataset from [algolia](https://www.algolia.com/)
3. Set below github repo secrets

     - `ALGOLIA_APPID=<ALGOLIA_APPID>` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
     - `ALGOLIA_APP_KEY=<ALGOLIA_APP_KEY>` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
     - `SLACK_WEBHOOK=<SLACK_WEBHOOK>` - check [actions-friday](https://github.com/ohmycheatsheet/actions-friday) usage

4. Deploy to Vercel'now, in [Vercel](https://vercel.com/) deployments settings, set below env variables as `Production & Preview & Development Environment Variables`
    
    [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/vercel/vercel/tree/master/examples/nextjs)

    - `NEXT_PUBLIC_ALGOLIA_APPID` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
    - `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)
    - `ALGOLIA_APP_KEY` - copy from [algolia-api-keys](https://www.algolia.com/account/api-keys)

5. new `issue` on github'issue

## tools

### `ctrlc`

[![ctrlc](https://user-images.githubusercontent.com/6839576/139172336-5d7beef3-ca6e-4f28-8e9a-8e0302680028.png)](https://github.com/ohmycheatsheet/cheatsheets)

- [ctrlc](https://github.com/ohmycheatsheet/ctrlc) - a chrome extension for pin `cheatsheet` from website like `stackoverflow`

### coming soon...

- 🚧 **[ctrlhub]()** - a desktop management app help you manage cheatsheet like pro
- 🚧 **[ctrlai]()** - a deeplearning model help you review your cheatsheets

# 
<div align='right'>

*built with ❤️ by [ohmycheatsheet](https://github.com/ohmycheatsheet/cheatsheets)*

</div>