This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

After cloning the repository, in the project directory, run:

`npm install`

## Running the app:

To run the app in development mode:<br />

`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Dataset

This project uses a subset of the [Yelp Dataset](https://www.yelp.com/dataset/challenge). The `/util/yelp_data_set_parse.js` script was used to reduce the data set. The resulting subset can be found in `/public/restaurants`. This subset contains restaurants in Las Vegas, Toronto, Pittsburgh, Phoenix, Montréal, Madison, and Dallas with at least 200 reviews.

## Creating the Data Subset

Download the [Yelp Dataset](https://www.yelp.com/dataset/challenge) and unzip it. Copy the `business.json` file into a working directory. Copy the `/util/yelp_data_set_parse.js` script from this repository into the working directory. Then run the following:

```
npm init
npm install --save ndjson
npm install --save through2
node yelp_data_set_parse.js
```
