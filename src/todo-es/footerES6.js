
'use strict';

import utils from './Utils.js'

var Utils = new utils();

var app = app || {};

class TodoFooter extends React.Component{
  render() {
    var activeTodoWord = Utils.pluralize(this.props.count, 'item');
    var clearButton = null;

    if (this.props.completed) {
      clearButton = (
        <button
          id="clear-completed"
          onClick={this.props.onClearCompleted}>
        Clear Completed
        </button>
      );
    }

    var cx = React.addons.classSet;
    var nowShowing = this.props.nowShowing;
    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>{this.props.count}</strong>{activeTodoWord} left
        </span>
        <ul id="filters">
          <li>
            <a href="#/"
              className={cx({selected: nowShowing === app.ALL_TODOS})}>
              All
            </a>
          </li>
          {' '}
          <li>
            <a href='#/active'
              className={cx({selected: nowShowing === app.ACTIVE_TODOS})}>
              Active
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/completed"
              className={cx({selected: nowShowing === app.COMPLETED_TODOS})}>
              Completed
            </a>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }
};


export default TodoFooter;
