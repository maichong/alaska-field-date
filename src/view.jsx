/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { shallowEqual } from 'alaska-admin-view';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import 'moment/locale/zh-cn';

export default class DateFieldView extends React.Component {

  shouldComponentUpdate(props) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model');
  }

  render() {
    let props = this.props;
    let value = props.value;
    let field = props.field;
    return (
      <div className="form-group">
        <label className="col-sm-2 control-label">{field.label}</label>
        <div className="col-sm-10">
          <DateTime
            value={value}
            dateFormat={field.format}
            timeFormat={false}
            onChange={props.onChange}
          />
        </div>
      </div>
    );
  }
}
