
// app.jsx 文件

'use strict';

// require('./todoItem.js');


// require('./footer.js');
// require('./todoModel.js');
import TodoFooter from './footerES6.js';
import TodoItem from './todoItemES6.js';
import todoModel from './todoModelES6.js';

var TodoModels = new todoModel();
var TodoModel = TodoModels.TodoModel;
var app = app || {};

app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';



var ENTRY_KEY = 13;

var TodoApp = React.createClass({
  getInitialState: function () {
    return {
      nowShowing: app.ALL_TODOS,
      editing: null
    };
  },

  componentDidMount: function () {
    var setState = this.setState;
    var router = Router({
      '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
      '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
      '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
    });
    router.init('/');
  },

  handleNewTodoKeyDown: function (event) {
    if (event.keyCode !== ENTRY_KEY) {
      return;
    }

    event.preventDefault();
    var val = React.findDOMNode(this.refs.newField).value.trim();
    if (val) {
      TodoModels.addTodo(val);
      React.findDOMNode(this.refs.newField).value = '';
    }
  },

  toggleAll: function (event) {
    var checked = event.target.checked;
    TodoModels.toggleAll(checked);
  },

  toggle: function (todoToToggle) {
    TodoModels.toggle(todoToToggle)
  },
  destroy: function(todo) {
    TodoModels.destroy(todo);
  },
  edit: function (todo) {
    this.setState({editing: todo.id});
  },
  save: function (totoToSave, text) {
    TodoModels.save(todoToSavem, text);
    this.setState({editing: null});
  },
  cancel: function () {
    this.setState({editing:null});
  },
  clearCompleted: function () {
    TodoModels.clearCompleted();
  },
  render: function (){
    var footer;
    var main;
    var todos = this.props.model.todos || this.props.model;

    var shownTodos = todos.filter(function (todo) {
      switch (this.state.nowShowing) {
        case app.ACTIVE_TODOS:
          return !todo.completed
          // break;
        case app.COMPLETED_TODOS:
          return todo.completed;
          // break;
        default:
          return true;
      }
    }, this);

    var todoItems = shownTodos.map(function (todo) {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel}
        />
      );
    }, this);

    var activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.clearCompleted}
        />
    }

    if (todos.length) {
      main = (
        <section id="main">
          <input
            id="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <ul id="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }

    return (
      <div>
        <header id="header">
          <h1>todos</h1>
          <input
            ref="newField"
            id="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.handleNewTodoKeyDown}
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
    );
  }
});

var model = new TodoModel('react-todos');
function render (obj) {
  var obj = obj || model;
  React.render(
    <TodoApp model={obj} />,
    document.getElementById('todoapp')
  );
}
TodoModels.subscribe(render);
render();
