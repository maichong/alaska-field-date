/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-22
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');

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
