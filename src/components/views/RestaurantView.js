import React from 'react';
import { Radio, Pagination } from 'semantic-ui-react';
import RestaurantList from './RestaurantList';
import FilterDropDown from '../userInterface/FilterDropDown';

class RestaurantView extends React.Component {
  state = {
    restaurants: [],
    cityFilter: '',
    categoryFilter: '',
    sort: false,
    activePage: 1,
    restaurantPerPage: 25
  };

  componentDidMount() {
    this.setState({ restaurants: this.props.restaurants });
  }

  componentDidUpdate = (prevProps, { cityFilter, categoryFilter, sort }) => {
    console.log(this.props);
    if (this.props.restaurants !== prevProps.restaurants)
      this.setState({ restaurants: this.props.restaurants });

    // Update the current list of restaurants on sort/filter change
    if (
      this.state.cityFilter !== cityFilter ||
      this.state.categoryFilter !== categoryFilter ||
      this.state.sort !== sort
    )
      this.setState({ restaurants: this.getCurrentRestaurants() });
  };

  getCurrentRestaurants = () => {
    let restaurants = this.props.restaurants
      .filter(({ city }) => {
        if (this.state.cityFilter === '') return true;
        return city === this.state.cityFilter;
      })
      .filter(({ categories }) => {
        if (this.state.categoryFilter === '') return true;
        return categories.split(', ').includes(this.state.categoryFilter);
      });

    return this.state.sort
      ? restaurants.sort(this.sortByUserRating)
      : restaurants;
  };

  onCityChange = (event, { value }) => {
    this.setState({ cityFilter: value });
  };

  onCategoryChange = (event, { value }) => {
    this.setState({ categoryFilter: value });
  };

  onSortToggle = (event, { checked }) => {
    this.setState({ sort: checked });
  };

  sortByUserRating = (a, b) => {
    if (a.stars === b.stars) return b.review_count - a.review_count;
    return b.stars - a.stars;
  };

  getPaginatedRestaurants = () => {
    let indexOfLastRestaurant =
      this.state.activePage * this.state.restaurantPerPage;

    if (indexOfLastRestaurant >= this.state.restaurants.length)
      indexOfLastRestaurant = this.state.restaurants.length - 1;

    let indexOfFirstRestaurant =
      indexOfLastRestaurant - this.state.restaurantPerPage;

    return this.state.restaurants.slice(
      indexOfFirstRestaurant,
      indexOfLastRestaurant + 1
    );
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui secondary menu">
          <div className="item">
            <FilterDropDown
              options={this.props.cities}
              text={'City'}
              onChange={this.onCityChange}
            />
          </div>
          <div className="item">
            <FilterDropDown
              options={this.props.categories}
              text={'Category'}
              onChange={this.onCategoryChange}
            />
          </div>
          <div className="right menu">
            <div className="item">
              <div className="ui icon input">
                <Radio
                  onChange={this.onSortToggle}
                  label="Sort by User Rating"
                  toggle
                />
              </div>
            </div>
          </div>
        </div>

        <div className="ui cards column one">
          <RestaurantList restaurants={this.getPaginatedRestaurants()} />
        </div>
        <div className="ui grid centered">
          <Pagination
            activePage={this.state.activePage}
            totalPages={Math.ceil(
              this.state.restaurants.length / this.state.restaurantPerPage
            )}
            boundaryRange={4}
            ellipsisItem={null}
            onPageChange={(e, { activePage }) => {
              console.log(activePage);
              this.setState({ activePage });
            }}
          />
        </div>
      </div>
    );
  }
}

export default RestaurantView;
