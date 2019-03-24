import React from 'react';

import './item-status-filter.css';


export default class ItemStatusFilter extends React.Component {

  onStatusSelected = (filterName) => {
    this.props.onStatusChange(filterName)

  }

  render() {
    const buttonTypes = [
      { name: 'All' },
      { name: 'Active' },
      { name: 'Done' },
    ]
    const buttons = buttonTypes.map(({ name }) => {
      const clazz = this.props.filter === name ? 'btn-info' : 'btn-outline-secondary'
      return <button type="button"
        className={`btn ${clazz}`}
        onClick={() => this.onStatusSelected(name)}
        key={name}
      > {name}</button >
    });


    return (
      <div className='btn-group'>
        {buttons}
      </div>
    );
  }
}

