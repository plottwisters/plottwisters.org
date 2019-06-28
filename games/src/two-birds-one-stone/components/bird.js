import {dndItemTypes} from '../tbos_constants';
import { useDrag, useDrop } from 'react-dnd';
import React, {Component} from 'react';
function Bird(props)  {

  let birdImgType = props.birdImgType;
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
          case dndItemTypes.CANVAS:
            props.actionCreators.dragTaskAction(dragProps.id, props.x + droppedEvent.deltaX, props.y + droppedEvent.deltaY);
            break;
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
    top: ((y * 100) + "%"),
    left: ((x * 100) + "%")
  }

  //bird type

  let birdGroup = "single";
  let classType = (props.isCat)?'gaggle':'';

  if(props.count == 1 ) {
    birdGroup = 'single';
  } else if(props.count == 2) {
    birdGroup = 'couple';
    classType+= 'gaggle couple';
    birdImgType= (birdImgType%2)+1;
  } else if(props.count > 2) {
    birdGroup = 'gaggle';
    classType+= 'gaggle group';
    birdImgType= (birdImgType%2)+1;
  }
  const birdType = {
    backgroundImage: "url(img/" + birdGroup + "-bird-" + birdImgType + ".png)"
  }



  return (
    <div onClick={props.clickListener} style={{opacity: isDragging ? 0 : 1}}>
    <div ref={refCallback} className={'bird-stone ' + classType} style={birdPosition}>
      <div className='bird' style={birdType}></div>
      <div className='stone'>
        <div className='taskName'>{name}</div>
        <div className='taskCount'>{props.count}</div>
      </div>
    </div>
    </div>
  )
}


export default Bird;
