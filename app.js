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

var Title = React.createClass({
  render: function() {
    var title = this.props.done ? 'Done tasks' : 'Todo tasks';
    return (<h2>{title}</h2>);
  }
});

var CompleteButton = React.createClass({
  render: function() {
    return (<button className="btn btn-default btn-xs">Done <span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>);
  }
});

var Todo = React.createClass({
  render: function() {
    var todo = this.props.todo;
    if (todo.done) {
      return (<li className="list-group-item">{todo.name}</li>);
    } else {
      return (<li className="list-group-item">{todo.name}<CompleteButton /></li>);
    }
  }
});

var TodoList = React.createClass({
  render: function() {
    var
    done = this.props.done,
    rows = this.props.todos.filter(function(todo) {
      return done == todo.done;
    }).map(function(todo) {
      return (<Todo key={todo.id} todo={todo}></Todo>);
    });
    return (
      <div className="active-todos">
        <Title done={done}/>
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
        <TodoList done={false} todos={todos}/>
        <TodoList done={true} todos={todos}/>
      </div>
    );
  }
});

React.render(
  <App></App>,
  document.getElementById('example')
);
