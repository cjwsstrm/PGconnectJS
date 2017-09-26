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



const personLookup = function (input,formatResult) {
  console.log("searching...");
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    client.query("SELECT * FROM famous_people WHERE last_name = $1",input, (err, result) => {
      if (err) {
         console.error("error running query", err);
      };
      formatResult(result);
      client.end();
    });
  });
};

const resultFormatter = function(result) {
  if (result.rows[0]) {
    const personId = result.rows[0].id
    const personFirstName = result.rows[0].first_name
    const personLastName = result.rows[0].last_name
    const doB = result.rows[0].birthdate.toDateString();
    console.log(`Found 1 person(s) by the name '${personLastName}':`)
    console.log(`- ${personId}: ${personFirstName} ${personLastName}, born ${doB}`);
  } else {
    console.log("None by that name found");
  }
}

personLookup(process.argv.slice(2),resultFormatter);

//Implement iteration over the rows, forEach or other, to
//allow for multiple queries at once.
