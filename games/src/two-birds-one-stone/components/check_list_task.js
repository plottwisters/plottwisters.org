import React, { Component } from 'react';

export default function CheckListTask(props)  {
  return (
    <label className="list-item" style={{position: "relative"}}>
      <input className="checkbox" type="checkbox" onChange={()=>{props.toggleCheck(props.id)}}/>
      <span className="itemName">{props.name}</span>
    </label>
  );
}
