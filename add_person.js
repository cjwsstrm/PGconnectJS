var pg = require('knex')({client: 'pg'});
const settings = require("./settings");
const fs = require("fs");
const knex = require('knex')({
  client: 'pg',
  connection: {
    "user": "development",
    "password": "development",
    "database": "vagrant",
    "hostname": "localhost",
    "port": 5432,
    "ssl": true
  }
});

const args = process.argv.slice(2);

const addPersontoFamousPeople = function (args) {
  console.log("searching...");
  knex("famous_people").insert({
    first_name: `${args[0]}`,
    last_name : `${args[1]}`,
    birthdate : `${args[2]}`
  }).returning('id').then(function (newId) {
    console.log("added with id: " + newId);
    // knex.select().table("famous_people");

    knex.destroy();
  });
};
addPersontoFamousPeople(args);
