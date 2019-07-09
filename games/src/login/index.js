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

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    }
  ],
  // Other config options...
});

export default Login;
