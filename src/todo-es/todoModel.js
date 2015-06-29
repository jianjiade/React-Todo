
'use strict';

import utils from './Utils.js';

var Utils = new utils();

var app = app || {};

// exports.module = class TodoModel{
//   constructor(key){
//     this.key = key;
//     this.todos = Utils.store(key);
//     this.onChanges = [];
//   }
// }
var TodoModel = function (key) {
  this.key = key;
  this.todos = Utils.store(key);
  this.onChanges = [];
};

var appModelPrototype = TodoModel.prototype;

appModelPrototype.inform = function () {
  Utils.store(this.key, this.todos);
  this.onChanges.forEach(function(cb) {cb(); });
};

appModelPrototype.addTodo = function (title) {
  this.todos = this.todos.concat({
    id: Utils.uuid(),
    title: title,
    completed: false
  });

  this.inform();
}

appModelPrototype.toggleAll = function (checked) {
  this.todos = this.todos.map(function (todo) {
    return Utils.extend({}, todo, {completed: checked});
  });

  this.inform();
}

appModelPrototype.toggle = function (todoToToggle) {
  this.todos = this.todos.map(function (todo) {
    return todo !== todoToToggle ? todo : Utils.extend({}, todo, {completed: !todo.completed});
  });

  this.inform();
};

appModelPrototype.destroy = function (todo) {
  this.todos = this.todos.filter(function (candidate) {
    return candidate !== todo;
  });
  this.inform();
};

appModelPrototype.save = function(todoToSave, text) {
  this.todos = this.todos.map(function (todo) {
    return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: ext});
  });

  this.inform();
};

appModelPrototype.clearCompleted = function () {
  this.todos = this.todos.filter(function (todo) {
    return !todo.completed;
  });
  this.inform();
};
