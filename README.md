# CrimeLab
Projet de noSql. Objectif, à partir d'une bdd d'appel, pouvoir regrouper des individus et faire des liens entre eux.

# Scénario 1 avec liens

Une voiture a été signalée volée, le propriétaire a découvert le vol en sortant du cinéma de la défense le 1er Janvier 2024 à 20h. Les forces de l’ordre ont été alertées grâce aux témoins. Le suspect Lucas a été interpellé par les policer et ses complices sont actuellement recherchés.

# Scénario 2 sans liens

Un vol de bijoux dans une maison à Bordeaux le 2 janvier 2024 à 23h, par un ancien sérurier. On cherche s'il pourrait avoir un complice.

# API
## Technos  
- Typescript
- Express

## Installation 
- npm install

## Principales routes

# Frontend
## Technos
- React ? 
- NeovisJs

## Feature
- Retrouver les informations d'un dossier (une affaire)
- Voir les dossiers liés à un user
- Qui était à proximité d'un lieu aux alentours d'un horaire
- Ajouter des dossiers
- etc à voir (go rajouter des trucs pour avoir la meilleure note ex : trouver un lien entre deux personnes...)


# DB
## Technos
- MongoDB
- Neo4j
- Kafka

## Collections
### Cases 
- Type : String
- Description : String
- Date : DateTime
- Location : Location
- Suspects : Persons[]
- Victims : Persons[]
- Witnesses : Persons[]
- Testimonies : Testimonies[]

### Persons
- Firstname : String
- Lastname : String
- Age : Number
- Location : Location

### Cities
- Name : String
- Country : String
- Lat : Number
- Lon : Number
- Postal_code : String

### Testimonies
- Case : Case
- Person: Person
- Description : String
- Date : DateTime

### Fadettes
- Date : DateTime
- Duree : Number
- Caller : Person
- Receiver : Person
- Type : String
- Relay : Relay

### Relays
- Name : String
- Location : Location

### Locations
- Street : String
- City : City
- Lat : Number
- Lon : Number