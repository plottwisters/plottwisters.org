import React, {Component} from 'react';
// import './ToDoItem.css';

class CheckViewItem extends Component {

    constructor(){
        super(...arguments);
        this.state = {
            todo: this.props.item.todo,
            completed: this.props.item.completed,
        }
    }

    toggleCompleted(){
        this.setState({completed: !this.state.completed});
    }

    render() {
        return (
            <div className="ToDoItem">
                {this.state.completed ? <p className="ToDoItem-Text-completed">{this.state.todo}</p> : <p className="ToDoItem-Text">{this.state.todo}</p>}
                <input className="chkbox" type="checkbox" value="" onChange={() => this.toggleCompleted()} />
            </div>
        );
    }
}

export default CheckViewItem;
