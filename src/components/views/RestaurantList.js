import React from 'react';

class RestaurantList extends React.Component {
  sortByUserRating = (a, b) => {
    if (a.stars === b.stars) return b.review_count - a.review_count;
    return b.stars - a.stars;
  };

  getRestaurants = () => {
    if (this.props.sort)
      return this.props.restaurants.slice().sort(this.sortByUserRating);
    return this.props.restaurants;
  };

  render() {
    const restaurants = this.getRestaurants().map(
      ({ name, review_count, stars, city, business_id, categories }) => {
        return (
          <div className="card" key={business_id}>
            <div className="content">
              <div className="header">{name}</div>
              <div className="meta">{city}</div>

              <div className="description">
                Categories:{' '}
                {categories
                  .split(', ')
                  .filter(item => item !== 'Restaurants')
                  .map(category => `${category}, `)}
              </div>
              <div className="extra content">
                {stars} stars & {review_count} reviews
              </div>
            </div>
          </div>
        );
      }
    );
    return restaurants;
  }
}

export default RestaurantList;
