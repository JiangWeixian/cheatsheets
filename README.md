# @aiou/nextjs-rematch2-template
> nextjs quick start

[![npm](https://img.shields.io/npm/v/@aiou/nextjs-rematch2-template?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/nextjs-rematch2-template)

## For Stater
> i am a stater

1. 在`api route`和`server`之间是两个服务器的问题，所以也就没有`CORS`问题。同样发生在`getInitialProps`在服务端执行的时候发生的情况。可以把`api route`理解为约定式的，简化版本的`express sever`。`nextjs`也提供`api route`之外的[custom-route](https://nextjs.org/docs/#custom-server-and-routing)的方式

## Q&A

1. `pages/api`
   
   `getInitialProps`中请求`baseUrl`为`''`（在开发模式下就是`localhost:port`）会请求到`pages/api` (无论是通过链接打开还是通过`url`刷新)。如果我们需要向`backend api`去请求一些数据的话，那么对于 **请求`baseUrl`不为`''`（在开发模式下不是`localhost:port`）** 这些接口就请求到真正的服务端。

2. `proxy`
   
   如果在`server.js`启用了代理。那么就不会将请求指向`pages/api`