const fs = require('fs');
const ndjson = require('ndjson');
const through = require('through2');

let cities = [
  'New York City',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose'
];

fs.createReadStream('business.json')
  .pipe(ndjson.parse())
  .pipe(
    through.obj(function(business, enc, next) {
      if (
        business.categories &&
        business.categories.split(', ').includes('Restaurants')
      ) {
        if (cities.includes(business.city)) {
          if (business.review_count > 100) {
            this.push(JSON.stringify(business) + '\n');
          }
        }
      }
      next();
    })
  )
  .pipe(fs.createWriteStream('./restaurants.json'));
