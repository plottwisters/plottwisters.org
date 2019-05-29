import React, {Component} from 'react';
import ToDoItem from './todo_item';


class ToDo extends Component {
  constructor(props) {
      super(props);
      this.state = {
          list: [
              {
                  'todo': 'do the create new tasks'
              },
              {
                  'todo': 'review Phaser'
              },
              {
                  'todo': 'review React'
              },
              {
                  'todo': 'buy bread and milk'
              }
          ],
          todo: ''
      };
  };

  create_item = () => {
    this.setState(({ list, todo }) => ({
      list: [
          ...list,
        {
          todo
        }
      ],
      todo: ''
    }));
  };


  handle_key = e => {
      if (e.target.value !== '') {
        if (e.key === 'Enter') {
          this.create_item();
        }
      }
  };

  handle_input = e => {
    this.setState({
      todo: e.target.value
    });
  };


  delete_item = item => {
    this.setState(({ list }) => ({
      list: list.filter((toDo, index) => index !== item)
    }));
  };


  render() {
      return (
        <div style={"display:" + this.props.display} className="tbos-overlay">
        <div className="ToDo-Body">
          <div className="ToDo">
              <h1 className="ToDo-Header">To Do</h1>
              <div className="ToDo-Container">
                  <div className="ToDo-Content">
                      {this.state.list.map((item, key) => {
                              return <ToDoItem
                                                key={key}
                                                item={item.todo}
                                                delete_item={this.delete_item.bind(this, key)}
                                            />
                        }
                      )}
                  </div>
                  <div>
                     <input className="ToDo-input" type="text" value={this.state.todo} onChange={this.handle_input} onKeyPress={this.handle_key}/>
                     <button className="ToDo-Add" onClick={this.create_item}>+</button>
                  </div>

              </div>
          </div>
          </div>
          </div>
      );
  }
}

export default ToDo;
