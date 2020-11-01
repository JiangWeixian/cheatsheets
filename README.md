![cheatsheets](https://i.loli.net/2020/04/24/skJDnlE4rUPKhFg.png)

## usage

1. use this repo as template

2. after deploy to Vercel'now, in [Vercel](https://vercel.com/) deployments settings, set `NEXT_PUBLIC_GITHUB_KEY` as `Production & Preview Environment Variables`
    
    [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/vercel/vercel/tree/master/examples/nextjs)

3. `vercel env pull`(maybe you need link to deployment), it will create `.env` file

    ```
    NEXT_PUBLIC_GITHUB_KEY=<personal-access-token>
    ```

4. new `issue` on github'issue