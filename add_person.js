var pg = require('knex')({client: 'pg'});
const settings = require("./settings");
const fs = require("fs");
const knex = require('knex')({
  client: 'pg',
  connection: {
    "user"     : settings.user,
    "password" : settings.password,
    "database" : settings.database,
    "host"     : settings.hostname,
    "port"     : settings.port,
    "ssl"      : settings.ssl
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
