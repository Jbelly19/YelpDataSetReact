import React from 'react';
import { Radio, Pagination } from 'semantic-ui-react';
import RestaurantList from './RestaurantList';
import FilterDropDown from '../userInterface/FilterDropDown';

class RestaurantView extends React.Component {
  state = {
    cityFilter: '',
    categoryFilter: '',
    sort: false,
    activePage: 1,
    restaurantPerPage: 25
  };

  onCityChange = (event, data) => {
    this.setState({ cityFilter: data.value });
  };

  onCategoryChange = (event, data) => {
    this.setState({ categoryFilter: data.value });
  };

  onSortToggle = (event, data) => {
    this.setState({ sort: data.checked });
  };

  getPaginatedRestaurants = () => {
    let indexOfLastRestaurant =
      this.state.activePage * this.state.restaurantPerPage;
    let indexOfFirstRestaurant =
      indexOfLastRestaurant - this.state.restaurantPerPage;

    return this.props.restaurants.slice(
      indexOfFirstRestaurant,
      indexOfLastRestaurant
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
              search={true}
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
          <RestaurantList
            sort={this.state.sort}
            restaurants={this.getPaginatedRestaurants()
              .filter(({ city }) => {
                if (this.state.cityFilter === '') return true;
                return city === this.state.cityFilter;
              })
              .filter(({ categories }) => {
                if (this.state.categoryFilter === '') return true;
                return categories
                  .split(', ')
                  .includes(this.state.categoryFilter);
              })}
          />
        </div>
        <div className="ui grid centered">
          <Pagination
            activePage={this.state.activePage}
            totalPages={Math.ceil(
              this.props.restaurants.length / this.state.restaurantPerPage
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
