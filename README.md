
 typescript stack --chat app(Next js, TRPC, react query, zod, Mongodb/Mongoose, firebase file upload( s3 code removed cause of card issues))
 
 next js 13( with mordern file structure)


note: here im use react trpc adapter in frontend.( next client adapter not supported for next 13 mordern file structure) 

there is lots of hydration issues, after hundreds of attempts i switched from next adapter to react adopter, working just enough for now .


--------------------------------------------------------------------------------------------------

# Next.js + tRPC

This example shows how you can make a typed query using a minimal implementation of tRPC following [`this as a reference`](https://trpc.io/docs/nextjs).

## Setup

```bash
npx create-next-app --example https://github.com/trpc/trpc --example-path examples/next-minimal-starter trpc-minimal-starter
cd trpc-minimal-starter
npm i
npm run dev
```

## Development

### Start project

```bash
npm run dev        # starts next.js
```
