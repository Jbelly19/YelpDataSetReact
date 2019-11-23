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

  componentDidUpdate = prevProps => {
    // let this.props.restaurants be the original restaurant list
    // Not sure if this is breaking conventions, it feels a little wrong
    if (this.props.restaurants !== prevProps.restaurants)
      this.setState({ restaurants: this.props.restaurants });
  };

  onCityChange = (event, { value }) => {
    // this seems like bad to use props as source of truth
    let restaurants = this.props.restaurants
      .filter(({ city }) => city === value)
      .filter(({ categories }) => {
        if (this.state.categoryFilter === '') return true;
        return categories.split(', ').includes(this.state.categoryFilter);
      });
    this.setState({ restaurants });
  };

  onCategoryChange = (event, { value }) => {
    // this seems like bad to use props as source of truth
    let restaurants = this.props.restaurants
      .filter(({ city }) => {
        if (this.state.cityFilter === '') return true;
        return city === this.state.cityFilter;
      })
      .filter(({ categories }) => {
        return categories.split(', ').includes(value);
      });
    this.setState({ restaurants });
  };

  sortByUserRating = (a, b) => {
    if (a.stars === b.stars) return b.review_count - a.review_count;
    return b.stars - a.stars;
  };

  onSortToggle = (event, { checked }) => {
    let restaurants;
    if (checked) {
      console.log('checked');
      restaurants = this.state.restaurants.slice().sort(this.sortByUserRating);
    } else {
      console.log('not checkd');
      restaurants = this.props.restaurants
        .filter(({ city }) => {
          if (this.state.cityFilter === '') return true;
          return city === this.state.cityFilter;
        })
        .filter(({ categories }) => {
          if (this.state.categoryFilter === '') return true;
          return categories.split(', ').includes(this.state.categoryFilter);
        });
    }

    this.setState({ restaurants });
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
            restaurants={this.getPaginatedRestaurants()}
          />
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
