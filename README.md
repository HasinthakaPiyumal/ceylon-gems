# Ceylon Gems - Setup Guide

Welcome to the Ceylon Gems project! This repository contains both the client (frontend) and server (backend) for a full-stack web application.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (or your preferred database, update Prisma config as needed)

---

## 1. Clone the Repository

```sh
git clone https://github.com/HasinthakaPiyumal/ceylon-gems.git
cd ceylon-gems
```

---

## 2. Setup the Server

```sh
cd server
npm install
```

### Configure Environment Variables

- Copy `.env.example` to `.env` and update the values as needed (e.g., database URL, JWT secret).

### Setup the Database

- Make sure your database is running.
- Run Prisma migrations:

```sh
npx prisma migrate deploy
```

### Start the Server

```sh
npm run dev
```

The server will start on the port specified in your `.env` file (default: 5000).

---

## 3. Setup the Client

```sh
cd ../client
npm install
```

### Configure Environment Variables

- Copy `.env.example` to `.env` and update the API URL if needed.

### Start the Client

```sh
npm run dev
```

The client will start on [http://localhost:5173](http://localhost:5173) by default.

---

## 4. Access the App

- Client: [http://localhost:5173](http://localhost:5173)
- Server API: [http://localhost:5000](http://localhost:5000)

---

## 5. Additional Commands

- **Run Prisma Studio (DB GUI):**
  ```sh
  npx prisma studio
  ```
- **Run Linting:**
  - Client: `npm run lint`
  - Server: `npm run lint`

---

## 6. Project Structure

- `client/` - React frontend (Vite, TypeScript)
- `server/` - Node.js backend (Express, TypeScript, Prisma)

---

## 7. Troubleshooting

- Ensure all environment variables are set correctly.
- Check that your database is running and accessible.
- If you encounter issues, check the logs in the terminal for errors.

---

## 8. Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 9. License

This project is licensed under the MIT License.
