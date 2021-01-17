![cheatsheets](https://i.loli.net/2020/04/24/skJDnlE4rUPKhFg.png)

![image](https://user-images.githubusercontent.com/6839576/98773017-fe5e1a00-2422-11eb-8ef2-f9af836b398c.png)


## features

- 🚀 easy and fast develop
- 📩 support review your learned cheatsheets
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