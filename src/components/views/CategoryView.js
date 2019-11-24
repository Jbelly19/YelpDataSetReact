import React from 'react';
import RestaurantPieChart from './RestaurantPieChart';
import FilterDropDown from '../userInterface/FilterDropDown';

class CategoryView extends React.Component {
  state = {
    city: ''
  };

  onCityChange = (event, { value }) => {
    this.setState({ city: value });
  };

  filterByCity = () => {
    return this.props.restaurants.filter(({ city }) => {
      if (this.state.city === '') return true;
      return city === this.state.city;
    });
  };

  render() {
    return (
      <div className="ui container">
        <FilterDropDown
          options={this.props.cities}
          text={'City'}
          onChange={this.onCityChange}
        />
        <RestaurantPieChart
          categories={this.state.categories}
          restaurants={this.filterByCity()}
        />
      </div>
    );
  }
}

export default CategoryView;
