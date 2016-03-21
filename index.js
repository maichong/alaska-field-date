/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-22
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');
const moment = require('moment');

class DateField extends alaska.Field {
  init() {
    let field = this;
    field.format = field.format || 'YYYY-MM-DD';
    this.underscoreMethod('format', function (format) {
      return moment(this.get(field.path)).format(format || field.format);
    });
  }

  createFilter(filter) {
    if (!filter) {
      return;
    }
    let value;

    //精确
    if (typeof filter === 'string' || filter instanceof Date) {
      value = filter;
    } else if (typeof filter === 'object' && filter.value) {
      value = filter.value;
    }
    if (value) {
      value = moment(value);
      if (!value.isValid()) {
        return undefined;
      }
      let end = moment(value).endOf('day').toDate();
      let start = moment(value).startOf('day').toDate();
      return { $lte: end, $gte: start };
    }

    //区间
    let bt;
    if (filter instanceof Array) {
      bt = filter;
    } else if (filter.$bt && filter.$bt instanceof Array) {
      bt = filter.$bt;
    }
    if (bt && bt.length === 2) {
      let start = moment(bt[0]);
      let end = moment(bt[1]);
      if (start.isValid() && end.isValid()) {
        return {
          $gte: start.startOf('day').toDate(),
          $lte: end.endOf('day').toDate()
        };
      }
    }

    //比较
    ['$gt', '$gte', '$lt', '$lte'].forEach((key) => {
      let val = filter[key];
      if (val) {
        if (!(val instanceof Date)) {
          val = moment(val);
          if (!val.isValid()) {
            return;
          }
          if (key[1] === 'g') {
            //$gt $gte
            val = val.startOf('day').toDate();
          } else {
            //$lt $lte
            val = val.endOf('day').toDate();
          }
        }
        if (!value) {
          value = {};
        }
        value[key] = val;
      }
    });
    if (value) {
      return value;
    }
  }
}

DateField.views = {
  cell: {
    name: 'DateFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'DateFieldView',
    field: __dirname + '/lib/view.js'
  }
};

DateField.plain = Date;

DateField.options = ['min', 'max', 'expires'];

DateField.viewOptions = ['min', 'max', 'format'];

module.exports = DateField;
