import React, { Component } from 'react'

export default class Filter extends Component {
  render() {
    return (
      <div className='filter'>
        <div className='filter-result'>{this.props.count} Products</div>
        <div className='filter-sort'>
            Order{" "}
            <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option>Latest</option>
            <option value="Lowest">Lowest</option>
            <option value="Highest">Highest</option>
            </select>
        </div>
        <div className='filter-color'>
            Filter{" "}
            <select value={this.props.color} onChange={this.props.filterProducts}>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
            </select>
        </div>
      </div>
    )
  }
}
