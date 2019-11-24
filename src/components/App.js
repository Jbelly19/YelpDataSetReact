import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RestaurantView from './views/RestaurantView';
import CategoryView from './views/CategoryView';
import RestaurantTable from './views/RestaurantTable';
import Header from './userInterface/Header';

class App extends React.Component {
  state = { restaurants: [] };

  componentDidMount() {
    fetch(process.env.PUBLIC_URL + '/restaurants.json')
      .then(response => response.json())
      .then(json => {
        // Create array of unique city names
        let cityNames = json.data.map(({ city }) => city);
        let citySet = new Set(cityNames);
        cityNames = [...citySet];

        // Create array of unique category names
        let categoryNames = json.data.map(restaurant =>
          restaurant.categories
            .split(', ')
            .filter(item => item !== 'Restaurants')
        );
        let categorySet = new Set(categoryNames.flat());
        categoryNames = [...categorySet];

        this.setState({
          restaurants: json.data,
          cities: cityNames,
          categories: categoryNames
        });
      });
  }

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <Header />
          <Route
            path="/"
            exact
            render={props => (
              <RestaurantView
                {...props}
                restaurants={this.state.restaurants}
                cities={this.state.cities}
                categories={this.state.categories}
              />
            )}
          />
          <Route
            path="/category/percentage"
            exact
            render={props => (
              <CategoryView
                {...props}
                restaurants={this.state.restaurants}
                cities={this.state.cities}
                categories={this.state.categories}
              />
            )}
          />
          <Route
            path="/category/highest-rated"
            exact
            component={RestaurantTable}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
