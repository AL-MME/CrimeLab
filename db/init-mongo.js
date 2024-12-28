const fs = require('fs');

db = db.getSiblingDB('crimeLab');

// City : 
const citiesData = JSON.parse(fs.readFileSync('/collections/cities.json', 'utf8'));
db.cities.insertMany(citiesData);

// Locations : 
const locationsData = JSON.parse(fs.readFileSync('/collections/locations.json', 'utf8'));
db.locations.insertMany(locationsData);

// Relays :
const relaysData = JSON.parse(fs.readFileSync('/collections/relays.json', 'utf8'));
db.relays.insertMany(relaysData);

// Persons :
const personsData = JSON.parse(fs.readFileSync('/collections/persons.json', 'utf8'));
db.persons.insertMany(personsData);

// Testimonies :
const testimoniesData = JSON.parse(fs.readFileSync('/collections/testimonies.json', 'utf8'));
db.testimonies.insertMany(testimoniesData);

// Cases : 
const casesData = JSON.parse(fs.readFileSync('/collections/cases.json', 'utf8'));
db.cases.insertMany(casesData);

// Fadettes :
const fadettesData = JSON.parse(fs.readFileSync('/collections/fadettes.json', 'utf8'));
db.fadettes.insertMany(fadettesData);


print('Collections imported successfully');