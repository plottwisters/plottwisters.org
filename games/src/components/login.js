import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};
    }

  render() {
    return (
      <div className="boop">
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

export default Login;
