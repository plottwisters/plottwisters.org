import React, { Component } from 'react';

export default function CheckListCategory(props)  {
  return (
    <label className="list-item" style={{position: "relative"}}>
      <input className="checkbox" type="checkbox" onChange={()=>{props.toggleCheck(props.id)}}/>
      <span className="categoryName">
        <span className="categoryCount">{props.count}</span>
        {props.name}
      </span>
    </label>
  );
}
