# Port Russell API

API REST sécurisée (JWT) pour gérer :
- les catways
- les réservations

## Authentification
Le client doit envoyer le token JWT dans l’en-tête :

Authorization: Bearer <token>

## Modules
- app : configuration Express
- middleware/auth : vérification JWT
- controllers : logique métier (CRUD)
- models : schémas MongoDB (Mongoose)
