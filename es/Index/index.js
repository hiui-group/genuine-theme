function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import './index.scss';
import Sider from '../components/Sider';
import Header from '../components/Header';
import BreadCrumb from '../components/BreadCrumb';
import Footer from '../components/Footer';

var Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index(props) {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      collapse: false
    };

    if (props.footer) {
      _this.resizeEvent = _this.resizeEvent().bind(_this);
      _this.changeFooterPosition = _this.changeFooterPosition.bind(_this);
    }
    return _this;
  }

  Index.prototype.componentDidMount = function componentDidMount() {
    if (this.props.footer) {
      this.changeFooterPosition();

      window.addEventListener('hashchange', this.changeFooterPosition);
      window.addEventListener('resize', this.resizeEvent);
    }
  };

  Index.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.props.footer) {
      window.removeEventListener('hashchange', this.changeFooterPosition);
      window.removeEventListener('resize', this.resizeEvent);
      this.resizeEvent = null;
    }
  };

  Index.prototype.changeFooterPosition = function changeFooterPosition() {
    var $footer = document.querySelector('#J_Footer');
    var $main = document.querySelector('#J_Main');

    var innerHeight = window.innerHeight;
    var footerHeight = $footer.offsetHeight;
    var mainHeight = $main.offsetHeight;

    if (innerHeight - mainHeight < footerHeight + 20) {
      $footer.classList.remove('absolute');
    } else {
      $footer.classList.add('absolute');
    }
  };

  Index.prototype.resizeEvent = function resizeEvent() {
    var start = Date.now();

    return function () {
      var now = Date.now();

      if (now - start > 200) {
        this.changeFooterPosition();
        start = now;
      }
    };
  };

  Index.prototype.getPage = function getPage(items) {
    var pathname = window.location.pathname;
    var hash = window.location.hash;
    var res = '';

    if (hash) {
      pathname = hash.replace(/#?(.*)/, function (a, b) {
        return b;
      });
    }

    var fn = function fn(arr) {
      for (var i = 0; i < arr.length; i++) {
        var cur = arr[i];
        if (cur.to === pathname) {
          res = cur.key;
          return;
        } else if (cur.children) {
          fn(cur.children);
        }
      }
    };

    fn(items);

    return res;
  };

  Index.prototype.changeCollapse = function changeCollapse(collapse) {
    this.setState({ collapse: collapse });
  };

  Index.prototype.render = function render() {
    var collapse = this.state.collapse;
    var _props = this.props,
        _props$header = _props.header,
        header = _props$header === undefined ? '' : _props$header,
        _props$routes = _props.routes,
        routes = _props$routes === undefined ? [] : _props$routes,
        _props$sider = _props.sider,
        sider = _props$sider === undefined ? {
      items: [],
      top: ''
    } : _props$sider,
        _props$theme = _props.theme,
        theme = _props$theme === undefined ? {
      type: 'inner',
      color: 'dark'
    } : _props$theme,
        breadCrumb = _props.breadCrumb,
        footer = _props.footer;


    document.body.classList.add('theme-' + theme.type);
    document.body.classList.add('theme-' + theme.color);

    return React.createElement(
      Router,
      null,
      React.createElement(
        'div',
        { className: 'terminal ' + (collapse ? 'collapse' : '') },
        React.createElement(Sider, {
          current: this.getPage(sider.items),
          sider: sider,
          changeCollapse: this.changeCollapse.bind(this)
        }),
        React.createElement(Header, {
          header: header,
          border: !!breadCrumb
        }),
        React.createElement(
          'div',
          { className: 'right' },
          React.createElement(
            'div',
            { className: 'main', id: 'J_Main' },
            breadCrumb ? React.createElement(BreadCrumb, {
              items: breadCrumb.items,
              sign: breadCrumb.sign
            }) : '',
            React.createElement(
              'div',
              { className: 'content' },
              renderRoutes(routes)
            )
          ),
          footer ? React.createElement(Footer, { footer: footer }) : ''
        )
      )
    );
  };

  return Index;
}(React.Component);

export default Index;