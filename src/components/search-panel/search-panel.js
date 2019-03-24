import React from 'react';

import './search-panel.css';

class SearchPanel extends React.Component {

  constructor() {
    super();
    this.state = {
      searchText: ''
    }
  }

  onSearchChange = (e) => {
    this.props.onSearchChange(e.target.value)
  }


  render() {
    return (
      <input type="text"
        onChange={this.onSearchChange}
        className="form-control search-input"
        placeholder="type to search" />
    )
  }
};

export default SearchPanel;
