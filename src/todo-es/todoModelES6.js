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
  };

  // var appModelPrototype = TodoModel.prototype;

  inform() {
    Utils.store(this.key, this.todos);
    this.onChanges.forEach(function(cb) {cb(); });
  };

  addTodo(title) {
    this.todos = this.todos.concat({
      id: Utils.uuid(),
      title: title,
      completed: false
    });

    this.inform();
  }

  toggleAll(checked) {
    this.todos = this.todos.map(function (todo) {
      return Utils.extend({}, todo, {completed: checked});
    });

    this.inform();
  }

  toggle(todoToToggle) {
    this.todos = this.todos.map(function (todo) {
      return todo !== todoToToggle ? todo : Utils.extend({}, todo, {completed: !todo.completed});
    });

    this.inform();
  };

  destroy (todo) {
    this.todos = this.todos.filter(function (candidate) {
      return candidate !== todo;
    });
    this.inform();
  };

  save (todoToSave, text) {
    this.todos = this.todos.map(function (todo) {
      return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: ext});
    });

    this.inform();
  };

  clearCompleted () {
    this.todos = this.todos.filter(function (todo) {
      return !todo.completed;
    });
    this.inform();
  };
}


export default todoModel;
