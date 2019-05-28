import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class CreateTask extends Component {
  constructor(props) {
      super(props);
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }
  render() {
    console.log(this.props.display);

    return (
      <div style={"display:" + this.props.display} className="tbos-overlay">
        <div className="center-container">
          <form>
             <input type="search" placeholder="Name Your Task..." onKeyPress={this.handleKeyPress} results/>
          </form>
        </div>
      </div>
    );
  }

  handleKeyPress() {
    if (e.key === 'Enter') {

     e.preventDefault();
   }
  }
}

export default CreateTask;
