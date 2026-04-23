# Einkaufslisten App

React (TypeScript) und Express (TypeScript) mit MongoDB (Mongoose): Einträge hinzufügen, als gekauft markieren, löschen.

## Setup

**MongoDB** starten oder URI von Atlas bereithalten.

**Server**

```
cd server
cp .env.example .env
```

In `.env` mindestens `MONGODB_URI` setzen. Dann:

```
yarn install
yarn dev
```

(Standard: API auf Port 3000, CORS für `http://localhost:5173`.)

**Client**

```
cd client
cp .env.example .env
```

In `.env` `VITE_API_URL` auf die API setzen (z. B. `http://localhost:3000`). Dann:

```
yarn install
yarn dev
```

**Produktion:** Server `yarn build` und `yarn start`, Client `yarn build` (Ausgabe in `client/dist`).

## UI

Als UI Basis dient **[RetroUI](https://retroui.dev)**. Die Komponenten liegen im Projekt unter `client/src/components/retroui`. RetroUI baut auf dem **shadcn/ui-Setup** (u. a. **Radix UI**-Primitives, **Tailwind CSS**); Einzelteile können z. B. über die shadcn CLI von der RetroUI Registry eingebunden werden. Es gibt kein separates `retroui`-npm Paket, der Code ist Teil dieses Repos.
