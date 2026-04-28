# Shopping List App

React (TypeScript) and Express (TypeScript) with MongoDB (Mongoose). You can add items, mark them as bought, and delete them. The repo is split into a `client` (Vite) and a `server` (Express) app.

## Setup

**MongoDB** Run MongoDB locally or have a MongoDB Atlas URI ready.

**Server**

```
cd server
cp .env.example .env
```

Set at least `MONGODB_URI` in `.env`. Then:

```
yarn install
yarn dev
```

By default the API uses port 3000 and allows CORS from `http://localhost:5173`.

**Client**

```
cd client
cp .env.example .env
```

Set `VITE_API_URL` in `.env` to your API base URL, for example `http://localhost:3000`. Then:

```
yarn install
yarn dev
```

**Production:** On the server run `yarn build` and `yarn start`. On the client run `yarn build`. Output is in `client/dist`.

## UI

The UI is based on **[RetroUI](https://retroui.dev)**. Components are in `client/src/components/retroui`. RetroUI follows the **shadcn/ui** setup (**Radix UI** primitives, **Tailwind CSS**). More blocks can be added with the shadcn CLI from the RetroUI registry. There is no separate `retroui` npm package; the code lives in this repository.
