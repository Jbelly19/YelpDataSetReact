import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui three item large secondary pointing menu">
      <Link to="/" className="item">
        Restaurants
      </Link>
      <Link to="/category/percentage" className="item">
        Category Percentages
      </Link>
      <Link to="/category/highest-rated" className="item">
        Category Highest Rated
      </Link>
    </div>
  );
};

export default Header;
