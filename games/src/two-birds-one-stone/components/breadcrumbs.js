import React, { Component } from 'react';

 export default function Breadcrumbs(props)  {

   let crumb = props.tbosRootPath.map((task) => {
    function crumbListener() {
      console.log(task);
      props.actionCreators.popTaskTbosRootUntil(task);
    }

     return (
      <span key={task} onClick={crumbListener}>{props.name[task]}</span>
    )
  });

   return (
    <div id="breadcrumb">
      {crumb}
    </div>
  );
}
