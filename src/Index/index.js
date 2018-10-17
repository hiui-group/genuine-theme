import React from 'react'
import {
  HashRouter as Router
} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import './index.scss'
import Sider from '../components/Sider'
import Header from '../components/Header'
import BreadCrumb from '../components/BreadCrumb'
import Footer from '../components/Footer'

class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      collapse: false
    }

    if (props.footer) {
      this.resizeEvent = this.resizeEvent().bind(this)
      this.changeFooterPosition = this.changeFooterPosition.bind(this)
    }
  }

  componentDidMount () {
    if (this.props.footer) {
      this.changeFooterPosition()

      window.addEventListener('hashchange', this.changeFooterPosition)
      window.addEventListener('resize', this.resizeEvent)
    }
  }

  componentWillUnmount () {
    if (this.props.footer) {
      window.removeEventListener('hashchange', this.changeFooterPosition)
      window.removeEventListener('resize', this.resizeEvent)
      this.resizeEvent = null
    }
  }

  changeFooterPosition () {
    const $footer = document.querySelector('#J_Footer')
    const $main = document.querySelector('#J_Main')

    const innerHeight = window.innerHeight
    const footerHeight = $footer.offsetHeight
    const mainHeight = $main.offsetHeight

    if (innerHeight - mainHeight < footerHeight + 20) {
      $footer.classList.remove('absolute')
    } else {
      $footer.classList.add('absolute')
    }
  }

  resizeEvent () {
    let start = Date.now()

    return function () {
      let now = Date.now()

      if (now - start > 200) {
        this.changeFooterPosition()
        start = now
      }
    }
  }

  getPage (items) {
    let pathname = window.location.pathname
    let hash = window.location.hash
    let res = ''

    if (hash) {
      pathname = hash.replace(/#?(.*)/, (a, b) => {
        return b
      })
    }

    const fn = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        const cur = arr[i]
        if (cur.to === pathname) {
          res = cur.key
          return
        } else if (cur.children) {
          fn(cur.children)
        }
      }
    }

    fn(items)

    return res
  }

  changeCollapse (collapse) {
    this.setState({collapse})
  }

  render () {
    const {
      collapse
    } = this.state
    let {
      header = '',
      routes = [],
      sider = {
        items: [],
        top: ''
      },
      theme = {
        type: 'inner',
        color: 'dark'
      },
      breadCrumb,
      footer
    } = this.props

    document.body.classList.add(`theme-${theme.type}`)
    document.body.classList.add(`theme-${theme.color}`)

    return (
      <Router>
        <div className={`terminal ${collapse ? 'collapse' : ''}`}>
          <Sider
            current={this.getPage(sider.items)}
            sider={sider}
            changeCollapse={this.changeCollapse.bind(this)}
          />
          <Header
            header={header}
            border={!!breadCrumb}
          />
          <div className='right'>
            <div className='main' id='J_Main'>
              {
                breadCrumb
                  ? (
                    <BreadCrumb
                      items={breadCrumb.items}
                      sign={breadCrumb.sign}
                    />
                  ) : ''
              }
              <div className='content'>
                {renderRoutes(routes)}
              </div>
            </div>
            {
              footer
                ? (
                  <Footer footer={footer} />
                ) : ''
            }
          </div>
        </div>
      </Router>
    )
  }
}

export default Index
