import {dndItemTypes} from '../tbos_constants';
import { useDrag, useDrop } from 'react-dnd';
import React, {Component, useMemo, useEffect} from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import StaticBird from './static_bird';
function makeNewBird() {
  return Math.floor(Math.random() * Math.floor(6)) + 1;
}
function Bird(props)  {



  //bird type
  let birdImgType = useMemo(() => makeNewBird(), []);

  const [{isDragging}, drag, preview] = useDrag({
    item: { id: props.id, birdImgType, name: props.name, type: dndItemTypes.BIRD },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
    end: (dragProps, monitor, component) => {


      if(monitor.didDrop()) {
        let droppedEvent = monitor.getDropResult();

        switch(droppedEvent.type) {
          case dndItemTypes.CANVAS:
            props.actionCreators.dragTaskAction(dragProps.id, props.x + droppedEvent.deltaX, props.y + droppedEvent.deltaY);
            break;
          case dndItemTypes.BIRD:
            if(droppedEvent.id != dragProps.id)
              props.actionCreators.categorizeTaskAction(droppedEvent.id, dragProps.id, props.currentRoot);
            else
              props.actionCreators.dragTaskAction(dragProps.id, props.x + droppedEvent.deltaX, props.y + droppedEvent.deltaY);
            break;
          case dndItemTypes.CHECKMARK:
            props.actionCreators.completeTaskAction(dragProps.id, props.currentRoot);
            break;
          case dndItemTypes.TRASH:
            props.actionCreators.deleteTaskAction(dragProps.id, props.currentRoot);
            break;
          default:
            break;
        }
      }
    }
  })




  const [collectedProps, drop] = useDrop({
    accept: dndItemTypes.BIRD,
    drop(dragProps, monitor, component) {
      let delta = monitor.getDifferenceFromInitialOffset();
      let currentCanvas = document.getElementById("tbos-canvas");
      return {type: dndItemTypes.BIRD, "id": props.id,  deltaX: delta.x/currentCanvas.clientWidth, deltaY: delta.y/currentCanvas.clientHeight}
    }
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, []);
  function refCallback(elementOrNode = null, options = null) {
    if(elementOrNode == null)
      return;
    drag(elementOrNode, options);
    drop(elementOrNode, options);
  }








  let x = props.x;
  let y = props.y;
  let name = props.name;
  const birdPosition = {
    top: ((y * 100) + "%"),
    left: ((x * 100) + "%")
  }

  birdPosition["opacity"] = isDragging ? 0 : 1;
  birdPosition["height"] =  isDragging ? 0 : '';
  birdPosition["cursor"] = isDragging? 'grabbing':  'grab';
  return (
    <div onClick={props.clickListener}  ref={refCallback} className='bird-stone' style={birdPosition}>

      <StaticBird id={props.id} name={props.name} birdImgType={birdImgType}/>
    </div>
  )
}

function comparator(currProps, prevProps) {
  if(!(currProps.x == prevProps.x && currProps.y == prevProps.y &&
    currProps.name == prevProps.name &&  prevProps.hiearchy == currProps.hiearchy)) {
      return false;
  } else {

    return true;
  }


}

export default React.memo((props)=>{ return (<Bird {...props}/>)}, comparator);
