import {dndItemTypes} from '../tbos_constants';
import { useDrag, useDrop } from 'react-dnd';
import React, {Component} from 'react';
function Bird(props)  {


  const [{isDragging}, drag] = useDrag({
    item: { id: props.id, type: dndItemTypes.BIRD },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
    end: (dragProps, monitor, component) => {
      if(monitor.didDrop()) {
        let droppedEvent = monitor.getDropResult();
        console.log(droppedEvent);
        switch(droppedEvent.type) {
          case dndItemTypes.BIRD:
            props.actionCreators.categorizeTaskAction(droppedEvent.id, dragProps.id, props.currentRoot);
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
    drop: () => ({type: dndItemTypes.BIRD, "id": props.id})
  })
  function refCallback(elementOrNode = null, options = null) {
    drag(elementOrNode, options);
    drop(elementOrNode, options);
  }





  let x = props.x;
  let y = props.y;
  let name = props.name;
  const birdPosition = {
    top: (Math.round(y * 100) + "%"),
    left: (Math.round(x * 100) + "%")
  }
  //bird type


  const birdType = {
    background: "url(img/single-bird-" + props.birdImgType + ".png)"
  }
  return (
    <div onClick={props.clickListener} style={{opacity: isDragging ? 0 : 1}}>
    <div  ref={refCallback} className='bird-stone' style={birdPosition}>
      <div className='bird' style={birdType}></div>
      <div className='stone'>
        <div className='taskName'>{name}</div>
      </div>
    </div>
    </div>
  )
}


export default Bird;
