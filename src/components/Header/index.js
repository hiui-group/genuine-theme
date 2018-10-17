import React, { Component } from 'react'
import './index.scss'

class Header extends Component {
  render () {
    const {
      header = '',
      style,
      border
    } = this.props

    return (
      <div className={`header ${border ? 'border' : ''}`} style={style}>
        { header }
      </div>
    )
  }
}

export default Header
