import React, { Component } from 'react';
import CheckViewItem from './check_view_item';
import { log } from 'util';


class CheckView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };


    };

    test() {
        console.log('checklist');
        let currentRoot = this.props.outerProps.tbosRootPath;
        // let temp = new Set();
        // temp = this.state.list;
        for (var item in this.props.outerProps.hiearchy[currentRoot]) {
            // console.log(item);
            this.setState(({list}) => {
                return {
                    list: [
                        ...list,
                        {
                            "name": this.props.outerProps.name[item],
                            "key": item
                        }
                    ]
                }
            });
        }
    };


    delete_item = item => {
        this.setState(({ list }) => ({
            list: list.filter((toDo, index) => index !== item)
        }));
    };

    goback() {
        this.props.toggleChecklistView();

    };

    componentDidMount() {
        console.log("hello");
        let currentRoot = this.props.outerProps.tbosRootPath;
        for (var item in this.props.outerProps.hiearchy[currentRoot]) {
            // console.log(this.state.list);
            this.state.list.push({'name': this.props.outerProps.name[item], 'key': item})
        }
        // console.log(this.state.list);
    }

    // componentDidUpdate() {
    //     this.test();
    // }

    render() {

        return (
            <div style={{ display: this.props.display }} className="tbos-overlay">
                <div className="todo">
                    <div className="todo-content-container">
                        <div className="full-screen-popup-header">
                            <h1>Checklist view</h1>
                            <button className="ToDo-OK" onClick={this.goback.bind(this)}>OK</button>
                        </div>
                        <div className="todo-tasks-container">
                            {this.state.list.map((item) => {
                                return <CheckViewItem
                                    key={item.key}
                                    name={item.name}
                                    delete_item={this.delete_item.bind(this, item.key)}
                                />
                            }
                            )}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default CheckView;
