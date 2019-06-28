import {dndItemTypes} from '../tbos_constants';
import {useDrop} from 'react-dnd';
import React, {Component} from 'react';
import {TaskState} from './../../global_constants';
import Bird from './bird.js';

function TbosCanvas(props)  {

  const [collectedProps, drop] = useDrop({
      accept: dndItemTypes.BIRD,
      drop(props, monitor, component) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let currentCanvas = document.getElementById("tbos-canvas");
        return {type: dndItemTypes.CANVAS, deltaX: delta.x/currentCanvas.clientWidth, deltaY: delta.y/currentCanvas.clientHeight}
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
      let {x, y} = props.position[task]
      let birdImgType = Math.floor(Math.random() * Math.floor(6)) + 1;

      let isCat = (Object.keys(props["hiearchy"][task]).filter(x=>(props["active"][x] == TaskState.active))).length > 0

      return (
        <Bird actionCreators={props.actionCreators} isCat={isCat} count={1} clickListener={birdClickListener.bind(this, task)} currentRoot={props.outerObject.getRootId()}  x={x} y={y} key={task} birdImgType={birdImgType} id={task} name={props.name[task]}/>
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
