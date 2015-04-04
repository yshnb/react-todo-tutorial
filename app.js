var todos = [{
  id: '_1',
  name: 'eat a pizza!',
  done: true 
}, {
  id: '_2',
  name: 'develop new wheel',
  done: false
}, {
  id: '_3',
  name: 'discuss bikeshed',
  done: false
}];

var Todo = React.createClass({
  render: function() {
    var todo = this.props.todo;
    return (<li className="list-group-item">{todo.name} <button className="btn btn-default btn-xs">Done <span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button></li>);
  }
});

var TodoList = React.createClass({
  render: function() {
    var rows = this.props.todos.filter(function(todo) {
      return !todo.done;
    }).map(function(todo) {
      return (<Todo key={todo.id} todo={todo}></Todo>);
    });
    return (
      <div className="active-todos">
        <h2>Todo tasks</h2>
        <ul className="list-group">{rows}</ul>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1>My Todo</h1>
        <TodoList todos={todos}/>
      </div>
    );
  }
});

React.render(
  <App></App>,
  document.getElementById('example')
);
