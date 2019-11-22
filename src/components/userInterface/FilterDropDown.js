import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const FilterDropDown = ({ options = [], text, onChange, search = false }) => {
  options = options.map(option => ({
    key: option,
    text: option,
    value: option
  }));
  return (
    <span>
      {text}
      {': '}
      <Dropdown
        inline
        options={options}
        defaultValue={''}
        onChange={onChange}
        search
      />
    </span>
  );
};

export default FilterDropDown;
