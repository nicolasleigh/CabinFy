# CabinFy

**Modern cabin booking platform** with multilingual support and a sleek admin dashboard for seamless rental management.

---

## 🏕️ Overview

**CabinFy** is a full-featured accommodation booking platform that connects travelers with unique cabin rentals. It delivers an intuitive booking experience for guests and a powerful dashboard for owners to manage listings and reservations.

Originally inspired by a React course, this project was fully rebuilt with a **custom Node.js/Express backend**, **PostgreSQL database**, and a **modernized UI** using **Tailwind CSS**—transforming it into a production-quality application with **multilingual support**, **responsive design**, and **containerized deployment**.

---

## 🚀 Features

- 🌐 **Multilingual Support**: English and Chinese supported via `react-i18next`
- 📱 **Responsive Design & Accessibility**: Optimized for mobile, tablet, and desktop with dark mode and accessibility best practices
- 🏡 **Guest Booking Interface**: Browse, view, and book cabins easily
- 🔐 **Admin Dashboard**:

  - Manage and process bookings
  - Add/edit cabin listings
  - Monitor availability and booking activity

- 🔎 **Smart Filtering & Sorting**: Supports filtering, pagination, and sorting for scalable data browsing
- 🔑 **Authentication & Authorization**: Secure access control with Passport.js and JWT

---

## 🧰 Tech Stack

### 🖥️ Frontend

- **React** – UI library
- **Tailwind CSS** – Utility-first styling
- **React Query** – Optimized server state management
- **React Router** – Navigation and routing
- **react-i18next** – Internationalization

### 🖥️ Backend

- **Node.js + Express** – RESTful API
- **PostgreSQL + Prisma** – Relational database & ORM
- **Zod** – Schema validation
- **Passport.js** – Authentication middleware
- **JWT** – Token-based authorization

### ⚙️ DevOps / Tooling

- **Docker** – Containerized services
- **docker-compose** – Local development orchestration
- **Caddy** – Static file server & reverse proxy with HTTPS
- **Makefile** – Automates repetitive dev tasks

---

## 🔐 Authentication System

CabinFy features a secure auth system built with:

- **Passport.js**: Traditional + OAuth strategies
- **JWT-based session management**
- **Custom Express middleware** for route protection
- Seamless integration with **Prisma's user model**

---

## ⚡ Deployment Architecture

- **Frontend**: Served via Caddy as static files
- **Backend**: Express API container behind Caddy reverse proxy
- **Database**: PostgreSQL container
- **Deployment**: Simplified via Docker & Makefile

---

## 📸 Screenshots

_Add demo screenshots or a GIF preview here_

---

## 📂 Project Setup

```bash
# Clone the repo
git clone https://github.com/your-username/cabinfy.git
cd cabinfy

# Start the app using Docker Compose
docker-compose up --build
```

_For local development setup, see the [docs](./docs/setup.md)._

---

## 📬 Contact

**Nicolas Leigh**
📧 [nicolas.leigh@qq.com](mailto:nicolas.leigh@qq.com)
🌍 [github.com/nicolasleigh](https://github.com/nicolasleigh)
