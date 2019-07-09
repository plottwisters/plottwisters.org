import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};
    }

  render() {
    // if(document.cookie.length <= 0) { 
    //   firebaseApp.logIn();
    // }
    console.log("login page")
    console.log(document.cookie);
    
    return (
      <div className="boop">
        <h1>hello</h1>
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
