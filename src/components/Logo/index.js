import React from 'react'
import './index.scss'

class Logo extends React.Component {
  render () {
    const {
      imgUrl = '',
      text = '',
      alt,
      height = '20',
      url,
      style
    } = this.props

    return (
      <div className='logo' style={style}>
        <a href={url} className='logo-box'>
          <img src={imgUrl} alt={alt} height={height} />
          <span className='logo-title'>{text}</span>
        </a>
      </div>
    )
  }
}

export default Logo
