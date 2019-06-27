import {dndItemTypes} from '../tbos_constants';
import {useDrop} from 'react-dnd';
import React, {Component} from 'react';
import Bird from './bird.js';

function TbosCanvas(props)  {

  const [collectedProps, drop] = useDrop({
      accept: dndItemTypes.BIRD,
      drop(props, monitor, component) {
        return {type: dndItemTypes.CANVAS}
      }
    });

    function generateHook(type) {
      return useDrop({
          accept: dndItemTypes.BIRD,
          drop(props, monitor, component) {
            return {type}
          }
        });
    }
    let [checkmarkProps, checkmarkHook] = generateHook(dndItemTypes.CHECKMARK);
    let [trashProps, trashHook] = generateHook(dndItemTypes.TRASH);
  function placeNewTask() {
    return {
      "x": 0.8 - (Math.random() * 0.6),
      "y": 0.5 - (Math.random() * 0.4)
    };
  }
  function birdClickListener(id) {
      
      let hiearchy = props.hiearchy[id];
      let leaf = Object.keys(hiearchy).filter(x=> props.active[x]).length == 0;
      if(!leaf)
        props.actionCreators.addTaskTbosRoot(id);

  }
  function backListener() {
    props.actionCreators.popTaskTbosRoot();
  }

  function renderTasks() {
    let currentTasks = props.outerObject.getRootTasksAsArray();
    return currentTasks.map((task) => {

      //bird position
      let {x, y} = placeNewTask();
      let birdImgType = Math.floor(Math.random() * Math.floor(6)) + 1;
      return (
        <Bird actionCreators={props.actionCreators} clickListener={birdClickListener.bind(this, task)} currentRoot={props.outerObject.getRootId()}  x={x} y={y} key={task} birdImgType={birdImgType} id={task} name={props.name[task]}/>
        )
    });
  }

  function backDisplay() {
    if(props.tbosRootPath.length > 1) {
      return "block"
    } else {
      return "none"
    }
  }





  return (
    <div id="game">
    <div ref={drop} id="tbos-canvas">


    </div>

    <div ref={trashHook} id="trash"></div>
    <div ref={checkmarkHook} id="checkmark"></div>
    <div id="undo"></div>
    <div id="addBird"></div>
    <div id="redo"></div>
    <div id="back" onClick={backListener} style={{display:backDisplay()}}></div>
    {renderTasks()}
    </div>
  )
}


export default TbosCanvas;
