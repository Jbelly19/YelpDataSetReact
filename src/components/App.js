import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RestaurantView from './views/RestaurantView';
import RestaurantPieChart from './views/RestaurantPieChart';
import RestaurantTable from './views/RestaurantTable';
import Header from './Header';

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={RestaurantView} />
        <Route
          path="/category/percentage"
          exact
          component={RestaurantPieChart}
        />
        <Route
          path="/category/highest-rated"
          exact
          component={RestaurantTable}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
