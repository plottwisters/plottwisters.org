import React, {Component} from 'react';
import ToDoItem from './todo_item';


class ToDo extends Component {
  constructor(props) {
      super(props);
      this.state = {
          list: [],
          newTaskInput: ''
      };
      this.handleKey = this.handleKey.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.createItem = this.createItem.bind(this);
  };

  createItem() {

    this.setState(({ list, newTaskInput }) => {
      console.log(newTaskInput);
      return {
      list: [
          ...list,
        {
          "name": newTaskInput
        }
      ],
      newTaskInput: ''
      }
    });

  };

  handleInput(e) {

    this.setState({
      newTaskInput: e.target.value
    });
  };

  handleKey(e) {

      if (e.target.value !== '') {
        if (e.key === 'Enter') {
          this.createItem();
        }
      }
  };

  deleteItem(item) {
    this.setState(({ list }) => ({
     list: list.filter((currItem) =>  currItem.name !== item)
   }));

  };
  render() {
      return (
        <div style={"display:" + this.props.display} className="tbos-overlay">

          <div className="todo">
            <div className="todo-content-container">
              <h1 className="todo-header">Add Things to Do</h1>


                  {this.state.list.map((item) => {
                          return <ToDoItem
                                            key={item.name}
                                            name={item.name}
                                            deleteItem={this.deleteItem.bind(this, item.name)}
                                        />
                    }
                  )}


              {/*create task input*/}
              <div class="todo-input-form">
                 <input  value={this.state.newTaskInput} className="todo-input" onChange={this.handleInput} type="text"  onKeyPress={this.handleKey}/>
                 <button className="todo-add" onClick={this.createItem}>+</button>
              </div>

              </div>
          </div>

        </div>
      );
  }
}

export default ToDo;
