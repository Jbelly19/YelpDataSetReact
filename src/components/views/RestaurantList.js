import React from 'react';

class RestaurantList extends React.Component {
  render() {
    const restaurants = this.props.restaurants.map(
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
