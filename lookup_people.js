const pg = require("pg");
const settings = require("./settings");
const fs = require("fs");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const personLookup = function (input) {
  console.log("searching...");
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    client.query("SELECT * FROM famous_people WHERE last_name = $1",input, (err, result) => {
      if (err) {
        return console.error("error running query", err);
      };
      if (!result.rows[0]) {
        console.log("None by that name found");
        client.end();
      } else {
        const personId = result.rows[0].id
        const personFirstName = result.rows[0].first_name
        const personLastName = result.rows[0].last_name
        const doB = result.rows[0].birthdate.toDateString();
        console.log(`Found person(s) by the name '${input}':`)
        console.log(`- ${personId}: ${personFirstName} ${personLastName}, born ${doB}`);
        client.end();
      }
    });
  });
};
personLookup(process.argv.slice(2));
//
// node lookup_people.js Lincoln
// Searching ...
// Found 1 person(s) by the name 'Lincoln':
// - 1: Abraham Lincoln, born '1809-02-12'
// SELECT * FROM famous_people WHERE last_name = input
// Select * from public.tbl_user;
