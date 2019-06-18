import React, {Component} from 'react';
// import './ToDoItem.css';

class CheckViewItem extends Component {

    constructor(props){
        super(props);
        this.toggleCompleted = this.toggleCompleted.bind(this);
    }

    toggleCompleted(){
        this.props.toggleCheck(this.props.id);
    }

    render() {
        return (
            <div className="todo-item">
                <p className="todo-item-text">{this.props.name}</p>
                <input className="chkbox" type="checkbox" value="" onChange={this.toggleCompleted} />
            </div>
        );
    }
}

export default CheckViewItem;
