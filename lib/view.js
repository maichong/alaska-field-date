'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('material-ui/lib/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _contextPure = require('material-ui/lib/mixins/context-pure');

var _contextPure2 = _interopRequireDefault(_contextPure);

var _datePicker = require('material-ui/lib/date-picker/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-02
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var moment = require('moment');

var DateFieldView = function (_React$Component) {
  _inherits(DateFieldView, _React$Component);

  function DateFieldView(props, context) {
    _classCallCheck(this, DateFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateFieldView).call(this, props));

    _this._handleChange = _this._handleChange.bind(_this);
    _this._formatDate = _this._formatDate.bind(_this);
    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      value: props.value ? new Date(props.value) : null
    };
    return _this;
  }

  _createClass(DateFieldView, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.context.views
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var newState = {};
      if (nextContext.muiTheme) {
        newState.muiTheme = nextContext.muiTheme;
      }
      if (nextContext.views) {
        newState.views = nextContext.views;
      }
      if (nextProps.value) {
        newState.value = new Date(nextProps.value);
      }
      this.setState(newState);
    }
  }, {
    key: '_handleChange',
    value: function _handleChange(event, value) {
      this.props.onChange && this.props.onChange(value);
    }
  }, {
    key: '_formatDate',
    value: function _formatDate(date) {
      return moment(date).format(this.props.field.format);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var model = _props.model;
      var data = _props.data;
      var field = _props.field;
      var value = _props.value;
      var onChange = _props.onChange;

      var others = _objectWithoutProperties(_props, ['model', 'data', 'field', 'value', 'onChange']);

      if (value) {
        value = new Date(value);
      }

      var muiTheme = this.state.muiTheme;

      var noteElement = field.note ? _react2.default.createElement(
        'div',
        { style: field.fullWidth ? muiTheme.fieldNote : muiTheme.fieldNoteInline },
        field.note
      ) : null;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_datePicker2.default, _extends({
          ref: 'input',
          fullWidth: field.fullWidth,
          floatingLabelText: field.label,
          value: value,
          onChange: this._handleChange,
          autoOk: true,
          formatDate: this._formatDate
        }, others)),
        noteElement
      );
    }
  }]);

  return DateFieldView;
}(_react2.default.Component);

DateFieldView.propTypes = {
  children: _react2.default.PropTypes.node
};
DateFieldView.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
DateFieldView.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
DateFieldView.mixins = [_contextPure2.default];
exports.default = DateFieldView;