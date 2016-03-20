/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

import { shallowEqual } from 'alaska-admin-view';

const moment = require('moment');

export default class DateFieldView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
      value: props.value ? new Date(props.value) : null
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
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

  shouldComponentUpdate(props) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model');
  }

  handleChange(event, value) {
    this.props.onChange && this.props.onChange(value);
  }

  formatDate(date) {
    return moment(date).format(this.props.field.format);
  }

  render() {
    let {
      field,
      value,
      disabled
      } = this.props;
    if (value) {
      value = new Date(value);
    }

    let { muiTheme } = this.state;
    let noteElement = field.note ?
      <div style={field.fullWidth?muiTheme.fieldNote:muiTheme.fieldNoteInline}>{field.note}</div> : null;
    return (
      <div><DatePicker
        ref="input"
        disabled={disabled}
        fullWidth={field.fullWidth}
        floatingLabelText={field.label}
        value={value}
        onChange={this.handleChange}
        autoOk={true}
        formatDate={this.formatDate}
      />{noteElement}</div>
    );
  }
}
