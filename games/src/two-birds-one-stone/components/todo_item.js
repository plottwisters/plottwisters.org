import React, {Component} from 'react';
// import './ToDoItem.css';

class ToDoItem extends Component {

    render() {
      
        return (
            <div className="todo-item">
                <p className="todo-item-text">{this.props.name}</p>
                <button className="todo-item-delete" onClick={this.props.deleteItem}>-
                </button>
            </div>
        );
    }
}

export default ToDoItem;
