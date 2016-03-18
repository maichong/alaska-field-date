/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-22
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');
const moment = require('moment');

exports.views = {
  cell: {
    name: 'DateFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'DateFieldView',
    field: __dirname + '/lib/view.js'
  }
};

exports.plain = Date;

/**
 * 初始化Schema
 * @param {field} field   alaksa.Model中的字段配置
 * @param {mongoose.Schema} schema
 * @param {alaska.Model} Model
 */
exports.initSchema = function (field, schema, Model) {
  let options = {
    type: Date
  };
  [
    'get',
    'set',
    'default',
    'index',
    'required',
    'select',
    'min',
    'max',
    'expires'
  ].forEach(function (key) {
    if (field[key] !== undefined) {
      options[key] = field[key];
    }
  });

  schema.path(field.path, options);

  Model.underscoreMethod(field.path, 'format', function (format) {
    return moment(this.get(field.path)).format(format || field.format || 'YYYY-MM-DD');
  });
};

/**
 * alaska-admin-view 前端控件初始化参数
 * @param field
 * @param Model
 */
exports.viewOptions = function (field, Model) {
  let options = alaska.Field.viewOptions.apply(this, arguments);
  options.cellFormat = field.cellFormat || 'YYYY-MM-DD';
  options.format = field.format || 'YYYY-MM-DD';
  return options;
};
