import React, { Component } from 'react';

export default function CheckListCategory(props)  {
  return (
    <label className="list-item" style={{position: "relative"}}>
      <input className="checkbox" checked={props.isChecked} type="checkbox" onChange={()=>{props.toggleCheck(props.id)}}/>
      <span onClick={()=>{props.actionCreators.addTaskTbosRoot(props.id)}} className="categoryName">
        <span  className="categoryCount">{props.count}</span>
      <span className="categoryNameWrapper">{props.name}</span>
      </span>
    </label>
  );
}
