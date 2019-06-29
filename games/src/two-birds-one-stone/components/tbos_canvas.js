import {dndItemTypes} from '../tbos_constants';
import {useDrop} from 'react-dnd';
import React, {Component} from 'react';
import Bird from './bird.js';
import {TaskState} from './../../global_constants';

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
          },
          collect: monitor=>({
            isOver: monitor.isOver()
          })
        });
    }
    let [checkmarkProps, checkmarkHook] = generateHook(dndItemTypes.CHECKMARK);
    let [trashProps, trashHook] = generateHook(dndItemTypes.TRASH);

  function birdClickListener(id) {
      let leaf = (props.taskAggregates[id]["total"] - props.taskAggregates[id]["deleted"] -  props.taskAggregates[id]["completed"]) == 1;
      if(!leaf)
        props.actionCreators.addTaskTbosRoot(id);

  }
  function backListener() {
    props.actionCreators.popTaskTbosRoot();
  }
  function dragEventHandler(event) {
    event.dataTransfer.dropEffect = 'none'
    event.dataTransfer.effectAllowed = 'none'
  }

  function renderTasks() {
    let currentTasks = props.outerObject.getRootTasksAsArray();
    return currentTasks.map((task) => {

      //bird position
      let {x, y} = props.position[task]
      let isCat = (Object.keys(props["hiearchy"][task]).filter(x=>(props["active"][x] == TaskState.active))).length > 0

       let tasksUnderCategory = props.taskAggregates[task]["total"] - props.taskAggregates[task]["completed"] - props.taskAggregates[task]["deleted"];

      return (
        <Bird isCat={isCat} count={tasksUnderCategory}  actionCreators={props.actionCreators} clickListener={birdClickListener.bind(this, task)} currentRoot={props.outerObject.getRootId()}  hiearchy={props.hiearchy[task]} x={x} y={y} key={task}  id={task} name={props.name[task]}/>
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

    <div ref={trashHook} className={trashProps.isOver?'teased':''} id="trash"></div>
    <div ref={checkmarkHook} className={checkmarkProps.isOver?'teased':''} id="checkmark"></div>
    <div id="undo"  onClick={props.actionCreators.undo} ></div>
    <div id="addBird" onClick={props.focusAddTask}></div>
    <div id="back" onClick={backListener} style={{display:backDisplay()}}></div>
    {renderTasks()}
    </div>
  )
}


export default TbosCanvas;
