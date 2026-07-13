# Quickie — Reward-Based Delivery Platform

A food/item delivery web app where users earn and spend **coins** (an
in-app reward currency) to place orders, alongside a standard cart and
checkout flow. Built as a team project (3 contributors).

## Features

- User registration and login
- Browse items by category, add to cart, adjust quantities
- Coin-based rewards: earn coins, spend coins on orders, balance checks
  before checkout
- Order placement and delivery status tracking
- User profile page
- Contact form

## Tech stack

- **Frontend**: Static HTML/CSS/JavaScript pages using the `fetch` API
  to call the backend (no framework/build step)
- **Backend**: Node.js, Express
- **Database**: MySQL (via `mysql2`)

## Project structure

```
Quickie/
├── backend/
│   ├── index.js          # Express app: all API routes
│   ├── connection.js     # MySQL connection config
│   └── package.json
├── index.html             # Landing page
├── login.html / login_mode.html
├── registration.html
├── delivery.html          # Menu browsing, cart, coin balance
├── order.html
├── confirmation.html
├── userprofile.html
├── coinpage.html
├── contact.html
├── images/
└── index.js                # Landing-page scroll animation script
```

## Setup

**1. Database** — create a MySQL database named `quickie` with tables for
`user`, `login`, `item`, `cart`, `order`, and `contact` matching the
columns referenced in `backend/index.js` (e.g. `user` needs `user_id`,
`Firstname`, `Lastname`, `Dob`, `username`, `Email`, `password`, `Phone`,
`coins`). No schema file is currently checked into the repo, so the
tables need to be created by hand to match the queries in `index.js`.

**2. Backend**

```bash
cd backend
npm install
```

Update `connection.js` with your local MySQL `host`, `user`, and
`password` if they differ from the defaults in the file, then:

```bash
npm start
```

This runs the API on `http://localhost:3001`.

**3. Frontend** — the HTML pages call the backend directly at
`http://localhost:3001/...`, so serve them with any static file server
(e.g. VS Code's Live Server) rather than opening the files with `file://`,
so `fetch` requests aren't blocked by the browser. `.vscode/launch.json`
is set up for Live Server on port 8080.

## Known limitations

- Several routes build SQL queries with direct string interpolation
  (e.g. `updateCoins`, `confirmOrder`, `sufficientCoins`, `cartItems`)
  instead of parameterized queries — these are vulnerable to SQL
  injection and shouldn't be used as-is beyond a local demo.
- `backend/index.js` has two `app.get("/")` handlers and two
  `app.post('/cart')` handlers; Express uses whichever was registered
  first, so the second definition of each is currently dead code.
- The `/order` POST route (`insert into order values`) is incomplete —
  it doesn't supply values or send a response.
- No database schema/migration file is included; tables must be created
  manually (see Setup above).
- `node_modules` is committed to the repository instead of being
  gitignored.

## Contributors

- Aditya Kumar Gope ([mrGope](https://github.com/mrGope)) — original repo, cart/order/coin modules
- Pankaj Devjani — contact form + backend integration, order pricing/cart price display, MySQL connection setup
- Ranjana C
