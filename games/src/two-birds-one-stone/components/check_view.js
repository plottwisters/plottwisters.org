import React, {Component} from 'react';
import CheckViewItem from './check_view_item';


class CheckView extends Component {
  constructor(props) {
      super(props);
      this.state = {
          list: [
              {
                  'todo': 'do the create new tasks',
                  'completed': false
              },
              {
                  'todo': 'review Phaser',
                  'completed': false
              },
              {
                  'todo': 'review React',
                  'completed': false
              },
              {
                  'todo': 'buy bread and milk',
                  'completed': false
              }
          ],
          todo: ''
      };
  };

  create_item = () => {
    this.setState(({ list, todo }) => ({
      list: [
          ...list,
        {
          todo
        }
      ],
      todo: ''
    }));
  };


  handle_key = e => {
      if (e.target.value !== '') {
        if (e.key === 'Enter') {
          this.create_item();
        }
      }
  };


  delete_item = item => {
    this.setState(({ list }) => ({
      list: list.filter((toDo, index) => index !== item)
    }));
  };


  render() {
      return (
          <div className="ToDo">
              <h1 className="ToDo-Header">Checklist view</h1>
              <div className="ToDo-Container">
                  <div className="ToDo-Content">
                      {this.state.list.map((item, key) => {
                              return <CheckViewItem
                                                key={key}
                                                item={item}
                                                delete_item={this.delete_item.bind(this, key)}
                                            />
                        }
                      )}
                  </div>
                  <div>
                     <button className="ToDo-OK" onClick="">OK</button>
                  </div>
              </div>
          </div>
      );
  }
}

export default CheckView;
