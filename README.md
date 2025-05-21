# 🎬 Montflix Rebirth

**Montflix Rebirth** is the modern Angular 19 reimplementation of the original [Montflix](https://github.com/thecodingmontana/montflix) project — a TMDB-powered movie and TV discovery app. Rewritten from the ground up using **Angular Signals**, **Tailwind CSS v4**, and enhanced UI/UX principles.

> This project replaces the previous Express.js + Pug-based version with a reactive, scalable Angular frontend.

---

## 🔁 Legacy Project

The original [Montflix](https://github.com/thecodingmontana/montflix) was built with:

- Express.js
- Pug templating
- TMDB API

---

## ⚙️ Tech Stack (Rebirth Version)

- **Framework:** Angular 19
- **State Management:** Angular Signals
- **Styling:** Tailwind CSS v4
- **API Integration:** TMDB REST API
- **Tooling:** Angular CLI, Vite

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/thecodingmontana/montflix-rebirth.git

# Move into the directory
cd montflix-rebirth

# Install dependencies
pnpm install
# or
npm install
```

## 🔑 Setup environment variables

### TMDB API Key Setup

To obtain TMDB API Key:

1. Create a TMDB account: [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Generate an API key under your profile settings

Create a `.env` file in the root:

```.env
NG_APP_TMDB_API_KEY = ****************
NG_APP_TMDB_API_URL = https://api.themoviedb.org/3
NG_APP_TMDB_API_IMAGE_URL = https://image.tmdb.org/t/p/w500
```
