function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import Icon from '@hi-ui/hiui/es/icon';

var Sider = function (_React$Component) {
  _inherits(Sider, _React$Component);

  function Sider() {
    var _temp, _this, _ret;

    _classCallCheck(this, Sider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      ctrls: {},
      active: '',
      collapse: false
    }, _this.LOCK = false, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Sider.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        current = _props.current,
        sider = _props.sider;
    var _sider$items = sider.items,
        items = _sider$items === undefined ? [] : _sider$items;

    current = current || (items[0] ? items[0].key : '');

    this.setState({ active: current });
  };

  Sider.prototype.getClickElement = function getClickElement(dom) {
    if (dom.nodeName === 'SPAN' && [].slice.call(dom.classList).indexOf('sider-list-item') > -1) {
      return dom.nextSibling;
    } else {
      var parent = dom.parentNode;
      return this.getClickElement(parent);
    }
  };

  Sider.prototype.toggleSlide = function toggleSlide(el, isClose, func, lock) {
    var _this2 = this;

    if (!isClose) {
      el.style.display = 'block';
      el.style.height = 0;
    }
    var maxDelay = 300;
    var height = el.scrollHeight;
    var speed = Math.max(height / maxDelay, 0.5);
    var sum = 0;

    var start = null;
    var animate = function animate(timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      sum = progress * speed;
      el.style.height = (isClose ? height - sum : sum) + 'px';
      if (height < sum) {
        if (isClose) {
          el.style.display = 'none';
        }
        el.style.height = '';
        func && func();
        lock && (_this2.LOCK = false);
      } else {
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  };

  Sider.prototype.renderNavs = function renderNavs(items, parent) {
    var _this3 = this;

    var _state = this.state,
        ctrls = _state.ctrls,
        active = _state.active,
        collapse = _state.collapse,
        prev = _state.prev;


    return React.createElement(
      'ul',
      { className: 'sider-list' },
      items.map(function (v, i) {
        return React.createElement(
          'li',
          {
            key: i
            // className={`${ctrls[v.key] ? 'open' : ''}`}
          },
          v.to ? React.createElement(
            Link,
            {
              className: 'sider-list-item ' + (active === v.key ? 'active' : '') + (v.noaction ? ' noaction' : ''),
              to: v.to,
              onClick: function onClick(e) {
                var open = !ctrls[v.key];
                ctrls = {};
                ctrls[v.key] = open;
                if (parent) {
                  ctrls[parent] = open;
                }
                active = v.key;

                _this3.setState({ ctrls: ctrls, active: active });
              }
            },
            v.icon ? React.createElement(
              'span',
              { className: 'sider-list-icon' },
              v.icon
            ) : '',
            React.createElement(
              'span',
              { className: 'sider-list-title' },
              v.title
            )
          ) : React.createElement(
            'span',
            {
              className: 'sider-list-item ' + (active === v.key ? 'active' : '') + (v.noaction ? ' noaction' : ''),
              onClick: function onClick(e) {
                if (v.children && v.children.length) {
                  _this3.LOCK = true;
                  var el = _this3.getClickElement(e.target);
                  if (prev && el && !prev.isSameNode(el)) {
                    _this3.toggleSlide(prev, true, null);
                  }
                  prev = el;

                  var open = !ctrls[v.key];
                  ctrls = {};
                  ctrls[v.key] = open;
                  if (parent) {
                    ctrls[parent] = open;
                  }
                  active = v.key;

                  _this3.setState({ ctrls: ctrls, active: active, prev: prev });
                  el && _this3.toggleSlide(el, !ctrls[v.key], null, true);
                }
              }
            },
            v.icon ? React.createElement(
              'span',
              { className: 'sider-list-icon' },
              v.icon
            ) : '',
            React.createElement(
              'span',
              { className: 'sider-list-title' },
              v.title
            ),
            v.children && v.children.length && !collapse && React.createElement(Icon, { className: 'mark-arrow', name: '' + (ctrls[v.key] ? 'up' : 'down') })
          ),
          v.children && v.children.length && !collapse && React.createElement(
            React.Fragment,
            null,
            _this3.renderNavs(v.children, v.key)
          )
        );
      })
    );
  };

  Sider.prototype.render = function render() {
    var collapse = this.state.collapse;
    var _props2 = this.props,
        _props2$sider = _props2.sider,
        sider = _props2$sider === undefined ? {} : _props2$sider,
        style = _props2.style;
    var _sider$items2 = sider.items,
        items = _sider$items2 === undefined ? [] : _sider$items2,
        _sider$top = sider.top,
        top = _sider$top === undefined ? '' : _sider$top;


    return React.createElement(
      'div',
      { className: 'sider ' + (collapse ? 'collapse' : ''), style: style },
      top || '',
      React.createElement(
        'div',
        { className: 'sider-list-box' },
        this.renderNavs(items)
      )
    );
  };

  return Sider;
}(React.Component);

export default Sider;