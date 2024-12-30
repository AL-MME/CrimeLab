const fs = require('fs');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function importData() {
    db = db.getSiblingDB('crimeLab');

    try {
        // City : 
        const citiesData = JSON.parse(fs.readFileSync('/collections/cities.json', 'utf8'));
        await db.cities.insertMany(citiesData);
        await sleep(200);

        // Locations : 
        const locationsData = JSON.parse(fs.readFileSync('/collections/locations.json', 'utf8'));
        await db.locations.insertMany(locationsData);
        await sleep(200);

        // Relays :
        const relaysData = JSON.parse(fs.readFileSync('/collections/relays.json', 'utf8'));
        await db.relays.insertMany(relaysData);
        await sleep(200);

        // Persons :
        const personsData = JSON.parse(fs.readFileSync('/collections/persons.json', 'utf8'));
        await db.persons.insertMany(personsData);
        await sleep(200);

        // Testimonies :
        const testimoniesData = JSON.parse(fs.readFileSync('/collections/testimonies.json', 'utf8'));
        await db.testimonies.insertMany(testimoniesData);
        await sleep(200);

        // Cases : 
        const casesData = JSON.parse(fs.readFileSync('/collections/cases.json', 'utf8'));
        await db.cases.insertMany(casesData);
        await sleep(200);

        // Fadettes :
        const fadettesData = JSON.parse(fs.readFileSync('/collections/fadettes.json', 'utf8'));
        for (const fadette of fadettesData) {
            await db.fadettes.insertOne(fadette);
            await sleep(200);
        }
        print('Collections imported successfully');
    } catch (error) {
        console.error('Error during data import:', error);
    }
}

importData();
