![cheatsheets](https://i.loli.net/2020/04/24/skJDnlE4rUPKhFg.png)

![image](https://user-images.githubusercontent.com/6839576/105569235-f6075100-5d7a-11eb-9444-eaa6ee7905a6.png)

> **WARNING**
> 
> *This app based on github issue api, but api looks like not stable. I will refactor recently to make it more stable. If you like this project, please take look at [ohmycheetsheet](https://github.com/ohmycheatsheet?type=source)*


## features

- 🚀 easy and fast develop
- 📩 support review your recently/some-day-your-learned cheatsheets
- ✨ support code-share with url or image
## usage

1. use this repo as template

2. after deploy to Vercel'now, in [Vercel](https://vercel.com/) deployments settings, set `CHEETSHEETS_KEY` as `Production & Preview Environment Variables`
    
    [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/vercel/vercel/tree/master/examples/nextjs)

3. `vercel env pull`(maybe you need link to deployment), it will create `.env` file

    ```
    CHEETSHEETS_KEY=<personal-access-token>
    ```

4. new `issue` on github'issue

### setup slack notify

use [cheatsheet-sdil-actions](https://github.com/JiangWeixian/cheatsheets-sdil-actions), send someday-i-learned cheatsheet to slack channel at `11:00am`
