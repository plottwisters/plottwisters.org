import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class CreateTask extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
    }
  handleChange(event) {
    this.setState({value: event.target.value});

  }
  handleSubmit(event) {

    this.props.createNewTask(this.state.value);
    this.setState({value:''});
    event.preventDefault();
  }
  handleCancel(event) {
    this.props.cancelNewTask();
    this.setState({value:''});
    event.preventDefault();
  }
  render() {

    return (
      <div style={{display:this.props.display}} className="tbos-overlay">
        <div className="center-container">
          <form className="form-combine-task-style" onSubmit={this.handleSubmit}>
             <input type="search" placeholder="Name this category..." value={this.state.value} className="popup-input-text" onChange={this.handleChange}  onKeyPress={this.handleKeyPress}/>
             <div className="popup-footer">
              <input type="submit" value="Submit" className="popup-submit-button"/>
            <input type="button" value="Cancel" onClick={this.handleCancel} className="popup-submit-button"/>
             </div>
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
