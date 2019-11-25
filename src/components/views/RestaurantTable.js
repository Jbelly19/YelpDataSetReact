import React from 'react';
import { Table } from 'semantic-ui-react';

const RestaurantTable = props => {
  const getRestaurantTable = () => {
    if (props.cities && props.cities.length) {
      return (
        <Table basic>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Stars</Table.HeaderCell>
              <Table.HeaderCell>Number of Reviews</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {props.cities.map(city => (
              <Table.Row key={city}>
                <Table.Cell>{city}</Table.Cell>
                <Table.Cell>{props.topCategories[city].category}</Table.Cell>
                <Table.Cell>{props.topCategories[city].stars}</Table.Cell>
                <Table.Cell>
                  {props.topCategories[city].review_count}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      );
    }

    // Still Loading
    return (
      <div className="ui segment">
        <div className="ui active dimmer">
          <div className="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  };

  return <div>{getRestaurantTable()}</div>;
};

export default RestaurantTable;
