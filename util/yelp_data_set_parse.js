const fs = require('fs');
const ndjson = require('ndjson');
const through = require('through2');

let cities = [
  'Las Vegas',
  'Toronto',
  'Pittsburgh',
  'Phoenix',
  'Montréal',
  'Madison',
  'Dallas'
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
          if (business.review_count > 200) {
            this.push(JSON.stringify(business) + ',');
          }
        }
      }
      next();
    })
  )
  .pipe(fs.createWriteStream('./restaurants.json'));
