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

const personLookup = function (args, formatResult) {
  console.log("searching...");
  args.forEach((name) => {
    knex("famous_people").where('last_name', `${name}`).asCallback(function(err, result) {
      if(err) {
        console.log(err);
      } else {
        // console.log(result);
        formatResult(result);
      }
    })
  });
  knex.destroy();
};

const resultFormatter = function(result) {
  if (!result) {
    console.log("Person not found")
  } else {
    result.forEach((person) => {
      const personId = person.id
      const personFirstName = person.first_name
      const personLastName = person.last_name
      const doB = person.birthdate.toDateString();
      console.log(`Found 1 person(s) by the name '${personLastName}':`)
      console.log(`- ${personId}: ${personFirstName} ${personLastName}, born ${doB}`);
    })
  }
}

personLookup(args, resultFormatter);
