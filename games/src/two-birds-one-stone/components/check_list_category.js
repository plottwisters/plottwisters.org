import React, { Component } from 'react';

export default function CheckListCategory(props)  {
  return (
    <div className="listCategory" onClick={()=>{props.actionCreators.addTaskTbosRoot(props.id)}}>
      {props.name}
    </div>
  );
}
