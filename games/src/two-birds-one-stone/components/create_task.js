import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class CreateTask extends Component {
  constructor(props) {
      super(props);
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }
  render() {
    
    return (
      <div style={{display:this.props.display}} className="tbos-overlay">
        <div className="center-container">
          <form>
             <input type="search" placeholder="Name Your Task..." onKeyPress={this.handleKeyPress}/>
          </form>
        </div>
      </div>
    );
  }

  //on press enter a new task is created with the appropriate name
  handleKeyPress(e) {
    if (e.key === 'Enter') {

     this.props.createNewTask(e.target.value);
     e.preventDefault();
   }
  }
}

export default CreateTask;
