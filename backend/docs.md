# Port Russell API — Documentation

Base URL (local) : http://127.0.0.1:3001

Toutes les routes CRUD sont protégées par JWT.
Header requis pour les routes privées :

Authorization: Bearer <token>

---

# 1. Authentification

## POST /login

Permet d'obtenir un token JWT.

### Body

{
  "email": "admin@port.local",
  "password": "Password123"
}

### Réponse 200

{
  "token": "JWT_TOKEN",
  "user": {
    "username": "Admin",
    "email": "admin@port.local"
  }
}

### Erreurs possibles
401 - Identifiants invalides
400 - Données invalides

---

# 2. Users

## GET /users

Retourne la liste des utilisateurs.

Réponse 200 :

[
  {
    "username": "Admin",
    "email": "admin@port.local"
  }
]

---

## GET /users/:email

Retourne un utilisateur.

Exemple :
/users/admin%40port.local

Réponse 200 :

{
  "username": "Admin",
  "email": "admin@port.local"
}

Erreur 404 :
{
  "message": "User not found"
}

---

## POST /users

Crée un utilisateur.

Body :

{
  "username": "Admin",
  "email": "admin@port.local",
  "password": "Password123"
}

Réponse 201 :

{
  "username": "Admin",
  "email": "admin@port.local"
}

---

## PUT /users/:email

Met à jour un utilisateur.
Le mot de passe est optionnel.

Body :

{
  "username": "Admin2",
  "password": "NewPassword123"
}

Réponse 200 :

{
  "username": "Admin2",
  "email": "admin@port.local"
}

---

## DELETE /users/:email

Supprime un utilisateur.

Réponse 204 :
No Content

---

# 3. Catways

:id correspond à catwayNumber

## GET /catways

Liste des catways.

Réponse 200 :

[
  {
    "catwayNumber": 1,
    "catwayType": "long",
    "catwayState": "Bon état"
  }
]

---

## GET /catways/:id

Retourne un catway.

Réponse 200 :

{
  "catwayNumber": 1,
  "catwayType": "long",
  "catwayState": "Bon état"
}

---

## POST /catways

Crée un catway.

Body :

{
  "catwayNumber": 1,
  "catwayType": "long",
  "catwayState": "Bon état"
}

Réponse 201 :

{
  "catwayNumber": 1,
  "catwayType": "long",
  "catwayState": "Bon état"
}

---

## PUT /catways/:id

Modifie uniquement catwayState.

Body :

{
  "catwayState": "À rénover"
}

Réponse 200 :

{
  "catwayNumber": 1,
  "catwayType": "long",
  "catwayState": "À rénover"
}

---

## DELETE /catways/:id

Supprime un catway.

Réponse 204 :
No Content

---

# 4. Reservations

Les réservations sont des sous-ressources d’un catway.

Route de base :
/catways/:id/reservations

:id = catwayNumber

:idReservation = _id MongoDB

---

## GET /catways/:id/reservations

Liste des réservations d’un catway.

Réponse 200 :

[
  {
    "_id": "6996e670ca3b170a69550d1a",
    "catwayNumber": 18,
    "clientName": "Jean Dupont",
    "boatName": "Sea Breeze",
    "startDate": "2026-02-01T00:00:00.000Z",
    "endDate": "2026-02-10T00:00:00.000Z"
  }
]

---

## GET /catways/:id/reservations/:idReservation

Retourne une réservation.

Réponse 200 :

{
  "_id": "6996e670ca3b170a69550d1a",
  "catwayNumber": 18,
  "clientName": "Jean Dupont",
  "boatName": "Sea Breeze",
  "startDate": "2026-02-01T00:00:00.000Z",
  "endDate": "2026-02-10T00:00:00.000Z"
}

---

## POST /catways/:id/reservations

Crée une réservation.

Body :

{
  "clientName": "Jean Dupont",
  "boatName": "Sea Breeze",
  "startDate": "2026-02-01",
  "endDate": "2026-02-10"
}

Règle :
endDate doit être après startDate.

Réponse 201 :

{
  "_id": "6996e670ca3b170a69550d1a",
  "catwayNumber": 18,
  "clientName": "Jean Dupont",
  "boatName": "Sea Breeze",
  "startDate": "2026-02-01T00:00:00.000Z",
  "endDate": "2026-02-10T00:00:00.000Z"
}

---

## PUT /catways/:id/reservations/:idReservation

Modifie une réservation.

Body :

{
  "clientName": "Jean Dupont",
  "boatName": "Sea Breeze",
  "startDate": "2026-02-02",
  "endDate": "2026-02-11"
}

Réponse 200 :

{
  "_id": "6996e670ca3b170a69550d1a",
  "catwayNumber": 18,
  "clientName": "Jean Dupont",
  "boatName": "Sea Breeze",
  "startDate": "2026-02-02T00:00:00.000Z",
  "endDate": "2026-02-11T00:00:00.000Z"
}

---

## DELETE /catways/:id/reservations/:idReservation

Supprime une réservation.

Réponse 204 :
No Content
