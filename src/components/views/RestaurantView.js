import React from 'react';
import RestaurantList from './RestaurantList';
import FilterDropDown from '../userInterface/FilterDropDown';

class RestaurantView extends React.Component {
  state = { cityFilter: '', categoryFilter: '' };

  onCityChange = (event, data) => {
    this.setState({ cityFilter: data.value });
  };

  onCategoryChange = (event, data) => {
    this.setState({ categoryFilter: data.value });
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
        </div>
        <div className="ui cards column one">
          <RestaurantList
            restaurants={this.props.restaurants
              .filter(({ city }) => {
                if (this.state.cityFilter === '') return true;
                return city === this.state.cityFilter;
              })
              .filter(({ categories }) => {
                if (this.state.categoryFilter === '') return true;
                return categories
                  .split(', ')
                  .includes(this.state.categoryFilter);
              })
              .slice(0, 50)}
          />
        </div>
      </div>
    );
  }
}

export default RestaurantView;
