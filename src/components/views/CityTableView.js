import React from 'react';
import RestaurantTable from './RestaurantTable';

const CityTableView = props => {
  const getTopCategory = inCity => {
    let categoryRatings = {};

    // for each restaurant in the city, calculate the highest rating/review count of each category
    for (let { city, categories, stars, review_count } of props.restaurants) {
      if (city !== inCity) continue;
      categories
        .split(', ')
        .filter(item => item !== 'Restaurants')
        .forEach(category => {
          if (categoryRatings.hasOwnProperty(category)) {
            // check if this restuarant with the same category has a higher rating and more reviews
            if (stars === categoryRatings[category].stars) {
              if (review_count > categoryRatings[category].review_count) {
                categoryRatings[category].review_count = review_count;
              }
            } else if (stars > categoryRatings[category].stars) {
              categoryRatings[category].stars = stars;
              categoryRatings[category].review_count = review_count;
            }
          } else {
            categoryRatings[category] = {
              stars: stars,
              review_count: review_count
            };
          }
        });
    }

    let topCategory = Object.entries(categoryRatings)
      .sort((a, b) => {
        if (a[1].stars === b[1].stars)
          return b[1].review_count - a[1].review_count;
        return b[1].stars - a[1].stars;
      })
      .slice(0, 1)
      .map(category => ({
        category: category[0],
        stars: category[1].stars,
        review_count: category[1].review_count
      }))[0];

    return topCategory;
  };

  const getTopCategoryForEachCity = () => {
    let cityCategoryRatings = {};
    if (props.cities) {
      for (let city of props.cities) {
        cityCategoryRatings[city] = getTopCategory(city);
      }
    }
    return cityCategoryRatings;
  };

  return (
    <div className="ui container">
      <h1 className="ui header">Top rated category for each city</h1>
      <p>Rating determined by stars and number of reviews</p>
      <RestaurantTable
        cities={props.cities}
        topCategories={getTopCategoryForEachCity()}
      />
    </div>
  );
};

export default CityTableView;
