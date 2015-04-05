var React = require('react/addons');
var TodoStorage = require('./storage');

var Title = React.createClass({
  render: function() {
    var title = this.props.done ? 'Done tasks' : 'Todo tasks';
    return (<h2>{title}</h2>);
  }
});

var CompleteButton = React.createClass({
  handleClick: function() {
    TodoStorage.complete(this.props.todo.id);
  },
  render: function(todo) {
    return (<button className="btn btn-default btn-xs" onClick={this.handleClick}>Done <span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>);
  }
});

var Todo = React.createClass({
  render: function() {
    var todo = this.props.todo;
    if (todo.done) {
      return (<li className="list-group-item">{todo.name}</li>);
    } else {
      return (<li className="list-group-item">{todo.name}<CompleteButton todo={todo}/></li>);
    }
  }
});

var TodoList = React.createClass({
  render: function() {
    var
    done = this.props.done,
    rows = this.props.todos.filter(function(todo) {
      return done ? todo.done : !todo.done;
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

var TodoForm = React.createClass({
  getInitialState: function() {
    return {
      name: ''
    };
  },
  handleNameChange: function(e) {
    this.setState({
      name: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    TodoStorage.create(name, function(error) {
      if (!error) {
        this.setState({
          name: ''
        });
      }
    }.bind(this));
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state.name !== nextState.name;
  },
  render: function() {
    var disabled = this.state.name.trim().length <= 0;
    return (
      <div className="row">
        <div className="col-md-12">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="col-md-10">
                <input type="text" className="form-control" value={this.state.name} placeholder="What needs to be done?" onChange={this.handleNameChange}></input>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-10">
                <input type="submit" value="Add" className="btn btn-primary" disabled={disabled}></input>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      todos: []
    };
  },
  componentDidMount: function() {
    var setTodoState = function(){
      TodoStorage.getAll(function(todos) {
        this.setState({
          todos: todos
        });
      }.bind(this));
    }.bind(this);
    TodoStorage.on('change', setTodoState);
    setTodoState();
  },
  render: function() {
    return (
      <div className="container">
        <h1>My Todo</h1>
        <TodoForm/>
        <TodoList done={false} todos={this.state.todos}/>
        <TodoList done={true} todos={this.state.todos}/>
      </div>
    );
  }
});

React.render(
  <App></App>,
  document.getElementById('example')
);
