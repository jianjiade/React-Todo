'use strict';
var app = app || {};

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;
class TodoItem extends React.Component{
  handleSubmit(event) {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  }
  handleEdit () {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  }
  handleKeyDown (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }
  handleChange (event) {
    this.setState({editText: event.target.value});
  }
  getInitialState () {
    return {editText: this.props.todo.title};
  }
  shouldComponentUpdate (nextProps, nextState) {
    return(
      nextProps.todo !== this.props.todo
    );
  }
  componentDidUpdate (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = React.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }
  render () {
    return (
      <li className={React.addons.classSet({
        completed: this.props.todo.completed,
        editing: this.props.editing
      })}>
        <div class="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
          />
          <label onDoubleClick={this.handleEdit}>
            {this.props.todo.title}
          </label>
          <button className="destroy" onClick={this.props.onDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          // value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}

export default TodoItem;
