# 📘 Port Russell – Gestion des Catways et Réservations

Application web complète (Backend + Frontend) permettant la gestion :

des utilisateurs

des catways

des réservations

Projet réalisé dans le cadre du devoir API Port Russell.

🏗 Architecture du projet
API_Port_Russell/
│
├── backend/      → API REST (Express + MongoDB Atlas)
├── frontend/     → Application web (Next.js + React + Bootstrap)
└── README.md

# 🛠 Technologies utilisées
Backend

Node.js

Express

MongoDB Atlas

Mongoose

JWT (jsonwebtoken)

bcrypt

CORS

Frontend

Next.js (App Router)

React

Bootstrap

React-Bootstrap

# ⚙️ Prérequis

Node.js v20+

Compte MongoDB Atlas

Git

# 🚀 Installation locale
🔵 1️⃣ Backend
1. Aller dans le dossier backend
cd backend

2. Installer les dépendances
npm install

3. Créer le fichier .env

Créer un fichier :

backend/.env


Contenu :

PORT=3001
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/port_russell
JWT_SECRET=supersecretkey


⚠️ Ce fichier ne doit PAS être versionné.

4. Lancer le backend
npm run dev


Attendu :

✅ MongoDB connecté


API disponible sur :

http://127.0.0.1:3001

🟢 2️⃣ Frontend
1. Aller dans le dossier frontend
cd frontend

2. Installer les dépendances
npm install

3. Créer le fichier .env.local

Créer :

frontend/.env.local


Contenu :

NEXT_PUBLIC_API_URL=http://127.0.0.1:3001


⚠️ Ce fichier ne doit PAS être versionné.

4. Lancer le frontend
npm run dev


Application disponible sur :

http://localhost:3000

# 🔐 Authentification

JWT utilisé

Token stocké en localStorage

Toutes les routes CRUD sont protégées

#👤 Compte de test

Créer un utilisateur via API ou via interface :

Email: admin@port.local
Password: Password123

# 📌 Fonctionnalités implémentées
🔑 Auth

Login

Logout

Protection des routes

👥 Users CRUD

Liste

Création

Modification

Suppression

⚓ Catways CRUD

Liste

Création

Modification (⚠️ état uniquement)

Suppression

📅 Reservations CRUD (sous-ressource)

Liste par catway

Création

Modification

Suppression

Validation des dates

📊 Dashboard

Nom utilisateur connecté

Date du jour

Tableau des réservations en cours

Menu navigation Bootstrap

# 🧪 Tests rapides

Lancer backend

Lancer frontend

Login

Tester CRUD Users

Tester CRUD Catways

Tester CRUD Reservations

Vérifier redirection sans token

# 📄 Documentation API

Accessible via :

http://127.0.0.1:3001

# 📂 Variables d’environnement (résumé)
Backend
PORT
MONGO_URI
JWT_SECRET

Frontend
NEXT_PUBLIC_API_URL

# 🎯 Projet prêt pour test en local

Pour lancer l'application :

Terminal 1
cd backend
npm run dev

Terminal 2
cd frontend
npm run dev


Puis ouvrir :

http://localhost:3000
