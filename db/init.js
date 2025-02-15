const citiesId = db.cities.insertMany([
  {
    name: "Paris1",
    country: "France",
    lat: 48.86484381718093,
    lon: 2.331393583797125,
    postal_code: "75001",
  },
  {
    name: "Versailles",
    country: "France",
    lat: 48.801408,
    lon: 2.130122,
    postal_code: "78000",
  },
  {
    name: "Courbevoie",
    country: "France",
    lat: 48.896636,
    lon: 2.256944,
    postal_code: "92400",
  },
  {
    name: "Puteaux",
    country: "France",
    lat: 48.884187,
    lon: 2.243661,
    postal_code: "92800",
  },
  {
    name: "Montpellier",
    country: "France",
    lat: 43.6119,
    lon: 3.8772,
    postal_code: "34000",
  },
  {
    name: "Lille",
    country: "France",
    lat: 50.62925,
    lon: 3.057256,
    postal_code: "59000",
  },
]);
function sleep(milliseconds) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < milliseconds) {}
}
sleep(1000);

const locationsId = db.locations.insertMany([
  {
    street: "5 Rue de la Paix",
    city: citiesId.insertedIds[0],
    lat: 48.86484381718093,
    lon: 2.331393583797125,
  },
  {
    street: "7 Rue de la Paix",
    city: citiesId.insertedIds[0],
    lat: 48.86484381718093,
    lon: 2.331393583797125,
  },
  {
    street: "1 Place Vendôme",
    city: citiesId.insertedIds[0],
    lat: 48.8675,
    lon: 2.3294,
  },
  {
    street: "12 Avenue de l'Opéra",
    city: citiesId.insertedIds[0],
    lat: 48.860611,
    lon: 2.331509,
  },
  {
    street: "21 Rue de la République",
    city: citiesId.insertedIds[1],
    lat: 48.801408,
    lon: 2.130122,
  },
  {
    street: "8 Rue du Parc",
    city: citiesId.insertedIds[2],
    lat: 48.896636,
    lon: 2.256944,
  },
  {
    street: "34 Boulevard de la Liberté",
    city: citiesId.insertedIds[3],
    lat: 48.884187,
    lon: 2.243661,
  },
  {
    street: "56 Avenue du Midi",
    city: citiesId.insertedIds[4],
    lat: 43.6119,
    lon: 3.8772,
  },
  {
    street: "10 Place de la Comédie",
    city: citiesId.insertedIds[4],
    lat: 43.608177,
    lon: 3.879483,
  },
  {
    street: "2 Rue de la Loge",
    city: citiesId.insertedIds[4],
    lat: 43.6119,
    lon: 3.8772,
  },
  {
    street: "5 Rue de la Paix",
    city: citiesId.insertedIds[5],
    lat: 50.62925,
    lon: 3.057256,
  },
]);

sleep(1000);

const relaysId = db.relays.insertMany([
  {
    name: "Relay1",
    location: locationsId.insertedIds[1],
  },
  {
    name: "Relay2",
    location: locationsId.insertedIds[9],
  },
]);

sleep(1000);

const personsId = db.persons.insertMany([
  {
    firstname: "Lucas",
    lastname: "Morel",
    age: 27,
    location: locationsId.insertedIds[0],
    phone: "0601020228",
  },
  {
    firstname: "Damien",
    lastname: "Lemoine",
    age: 25,
    location: locationsId.insertedIds[2],
    phone: "0601020229",
  },
  {
    firstname: "Karim",
    lastname: "Djaouad",
    age: 28,
    location: locationsId.insertedIds[3],
    phone: "0601020300",
  },
  {
    firstname: "Marie",
    lastname: "Dubois",
    age: 45,
    location: locationsId.insertedIds[4],
    phone: "0601020301",
  },
  {
    firstname: "Ahmed",
    lastname: "Benali",
    age: 32,
    location: locationsId.insertedIds[5],
    phone: "0601020302",
  },
  {
    firstname: "Enzo",
    lastname: "Lopez",
    age: 32,
    location: locationsId.insertedIds[6],
    phone: "0601020303",
  },
  {
    firstname: "René",
    lastname: "Lefevre",
    age: 22,
    location: locationsId.insertedIds[7],
    phone: "0601020304",
  },
  {
    firstname: "Mireille",
    lastname: "Mercier",
    age: 70,
    location: locationsId.insertedIds[8],
    phone: "0601020305",
  },
  {
    firstname: "Jannine",
    lastname: "Mercier",
    age: 65,
    location: locationsId.insertedIds[10],
    phone: "0601020306",
  },
]);

sleep(1000);

const testimoniesId = db.testimonies.insertMany([
  {
    person: personsId.insertedIds[3],
    description:
      "J'ai remarqué deux hommes rôder autour d'une voiture. L'un d'eux, grand avec une veste à capuche noire, semblait forcer la portière pendant que l'autre faisait le guet et qu'un troisieme attendait dans une autre voiture. Ils sont montés rapidement et sont partis avant que la police arrive. Celui qui avait gardé la voiture a lui été interpellé.",
    date: new Date("2024-01-02"),
  },
  {
    person: personsId.insertedIds[4],
    description:
      "Je mettais mes affaires dans mon coffre quand j'ai entendu un bruit métallique. J'ai vu deux types entrer précipitamment dans une Renault Mégane grise. Ils se sont séparés en deux groupes quand la police est arrivée",
    date: new Date("2024-01-02"),
  },
  {
    person: personsId.insertedIds[5],
    description:
      "Je suis allé au cinéma, quand je suis revenu, ma voiture n'était plus là. J'ai vu deux hommes, l'un grand et l'autre petit, s'enfuir à bord de ma Renault Mégane grise.",
    date: new Date("2024-01-01"),
  },
]);

sleep(1000);

const casesId = db.cases.insertMany([
  {
    type: "Vol",
    description: "Vol de voiture",
    date: new Date("2024-01-01T20:00:00Z"),
    location: locationsId.insertedIds[0],
    suspects: [
      personsId.insertedIds[0],
      personsId.insertedIds[1],
      personsId.insertedIds[2],
    ],
    witnesses: [personsId.insertedIds[3], personsId.insertedIds[4]],
    victims: [personsId.insertedIds[5]],
    testimonies: [
      testimoniesId.insertedIds[0],
      testimoniesId.insertedIds[1],
      testimoniesId.insertedIds[2],
    ],
  },
  {
    type: "Cambriolage",
    description: "Cambriolage de maison, vol de bijoux",
    date: new Date("2024-01-01T20:00:00Z"),
    location: locationsId.insertedIds[8],
    suspects: [personsId.insertedIds[6]],
    witnesses: [],
    victims: [personsId.insertedIds[7]],
    testimonies: [],
  },
]);

sleep(1000);

db.testimonies.update(
  {},
  { $set: { case: casesId.insertedIds[0] } },
  { multi: true }
);

const fadettesId = db.fadettes.insertMany([
  {
    date: new Date("2024-01-01T18:00:00Z"),
    duration: 20,
    caller: personsId.insertedIds[0],
    receiver: personsId.insertedIds[1],
    type: "call",
    relay: relaysId.insertedIds[0],
  },
  {
    date: new Date("2024-01-01T19:55:00Z"),
    duration: 0,
    caller: personsId.insertedIds[0],
    receiver: personsId.insertedIds[1],
    type: "sms",
    relay: relaysId.insertedIds[0],
  },
  {
    date: new Date("2024-01-01T20:05:00Z"),
    duration: 0,
    caller: personsId.insertedIds[0],
    receiver: personsId.insertedIds[1],
    type: "sms",
    relay: relaysId.insertedIds[0],
  },
  {
    date: new Date("2024-01-01T20:30:00Z"),
    duration: 30,
    caller: personsId.insertedIds[1],
    receiver: personsId.insertedIds[0],
    type: "call",
    relay: relaysId.insertedIds[0],
  },
  {
    date: new Date("2024-01-01T21:00:00Z"),
    duration: 23,
    caller: personsId.insertedIds[2],
    receiver: personsId.insertedIds[0],
    type: "call",
    relay: relaysId.insertedIds[0],
  },
  {
    date: new Date("2024-01-01T23:00:00Z"),
    duration: 0,
    caller: personsId.insertedIds[2],
    receiver: personsId.insertedIds[0],
    type: "sms",
    relay: relaysId.insertedIds[0],
  },
  {
    date: new Date("2024-01-01T23:00:00Z"),
    duration: 0,
    caller: personsId.insertedIds[2],
    receiver: personsId.insertedIds[0],
    type: "sms",
    relay: relaysId.insertedIds[0],
  },
  {
    date: new Date("2023-10-05T17:00:00Z"),
    duration: 22,
    caller: personsId.insertedIds[8],
    receiver: personsId.insertedIds[7],
    type: "call",
    relay: relaysId.insertedIds[1],
  },
]);
