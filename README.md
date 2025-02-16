# CrimeLab

CrimeLab est un projet de base de données NoSQL ayant pour objectif de partir d'une base de données non relationnelle et de générer des schémas visuels mettant en évidence les relations entre les différentes données.

## Équipe de développement

- **Enzo MOY**
- **Manon ROULEAU**
- **Mathis FREMIOT**

## Description des scénarios

### 🕵️‍♂️ Scénario 1 : Avec relations

Une voiture a été signalée volée. Le propriétaire a découvert le vol en sortant du cinéma de La Défense, le 1er janvier 2024 à 20h. Les forces de l'ordre ont été alertées grâce aux témoignages recueillis sur place. Le suspect Lucas a été interpellé, et ses complices sont actuellement recherchés.

### 🧩 Scénario 2 : Sans relations (avec bonus CSV)

Un vol de bijoux a été commis dans une maison à Montpellier, le 2 janvier 2024 à 20h. Le principal suspect est un ancien serrurier. L'enquête vise à déterminer s'il aurait pu agir avec un complice.

## 🛠️ Technologies utilisées

### Backend
- **TypeScript**
- **Express**

### Frontend
- **React.js**
- **Neovis.js** *(Visualisation de graphes)*

### Bases de données
- **MongoDB** *(NoSQL)*
- **Neo4j** *(Base orientée graphe)*

## 🚀 Installation et initialisation des bases de données

1. **Lancer les conteneurs Docker :**

```bash
cd ./db
docker-compose up --build -d
```

2. **Initialiser la réplication et charger les données :**

```bash
docker exec -it mongo mongosh
rs.initiate({
    _id: 'rs0',
    members: [
        { _id: 0, host: 'mongo:27017' }
    ]
});
use crimeLab
load('/docker-entrypoint-initdb.d/init.js')
```

## ▶️ Démarrer l'application

1. **Démarrer l'API :**

```bash
cd ./api
npm install
npm start
```

2. **Démarrer le frontend :**

```bash
cd ./crimelab-front
npm install
npm start
```

## 🔍 Utilisation

Accédez à l'interface utilisateur via [http://localhost:3000](http://localhost:3000) pour interagir avec les données et visualiser les relations sous forme de graphes.

## ⚠️ Remarques

- Assurez-vous que Docker est installé et en cours d'exécution.
- MongoDB doit être correctement initialisé avant de lancer l'application.