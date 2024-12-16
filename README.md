# CrimeLab
Projet de noSql. Objectif, à partir d'une bdd d'appel, pouvoir regrouper des individus.

# Scénario 1

# Scénario 2

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

## Collections (a revoir) 
### AFFAIRES 
- Nom
- Lieu
- Date
- Suspects (avec témoignage lié?)
- Victime
- Témoins
### INDIVIDUS
- Nom
- Prenom
- Age
- Adresse (lieu)
- Informations (témoignages? a voir si on stock ici ou si on met leur id dans les affaires)
### LIEUX
- Adresse
- Ville
- Code postal
- Lat
- Lng
### TEMOIGNAGES
- Déclaration
- Infos liées?
### APPELS (fadettes)
- Date
- Heure
- Duree
- Source (tel)
- Destination (tel)
- Type (SMS, APP...)
- Localisation
- Relais

### Relais?? 