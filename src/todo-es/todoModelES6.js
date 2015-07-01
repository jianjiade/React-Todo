'use strict';

import utils from './Utils.js';

var Utils = new utils();

var app = app || {};


class todoModel {
  constructor(){

  }

  TodoModel(key) {
    this.key = key;
    this.todos = Utils.store(key);
    this.onChanges = [];
    app.todos = this.todos;
    app.onChanges = this.onChanges;
    app.key = this.key;
  };

  // var appModelPrototype = TodoModel.prototype;
  subscribe(onChange) {
    app.onChanges.push(onChange);
  };

  inform() {
    Utils.store(app.key, app.todos);
    app.onChanges.forEach(function(cb) {cb(); });
  };

  addTodo(title) {
    app.todos = app.todos.concat({
      id: Utils.uuid(),
      title: title,
      completed: false
    });

    this.inform();
  }

  toggleAll(checked) {
    app.todos = app.todos.map(function (todo) {
      return Utils.extend({}, todo, {completed: checked});
    });

    this.inform();
  }

  toggle(todoToToggle) {
    app.todos = app.todos.map(function (todo) {
      return todo !== todoToToggle ? todo : Utils.extend({}, todo, {completed: !todo.completed});
    });

    this.inform();
  };

  destroy (todo) {
    app.todos = app.todos.filter(function (candidate) {
      return candidate !== todo;
    });
    this.inform();
  };

  save (todoToSave, text) {
    app.todos = app.todos.map(function (todo) {
      return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: ext});
    });

    this.inform();
  };

  clearCompleted () {
    app.todos = app.todos.filter(function (todo) {
      return !todo.completed;
    });
    this.inform();
  };
}


export default todoModel;
