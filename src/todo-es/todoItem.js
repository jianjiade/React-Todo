

'use strict';

var app = app || {};

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

app.TodoItem = React.createClass({
  handleSubmit: function (event) {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  },
  handleEdit: function () {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  }
});
