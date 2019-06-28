
import React, {Component} from 'react';
function StaticBird(props) {

  const birdStyles = {
    background: "url(img/single-bird-" + props.birdImgType + ".png)"
  }
  return(
    <div>
    <div className='bird' style={birdStyles}></div>
  <div className='stone'>
    <div className='taskName'>{props.name}</div>
  </div>
</div>);
}

function comparator(currProps, prevProps) {
  if(!(currProps.name == prevProps.name && currProps.birdImgType == prevProps.birdImgType  &&
    currProps.id == prevProps.id)) {
      return false;

  } else {
    return true;
  }


}
export default React.memo((props)=>{ return (<StaticBird {...props}/>)}, comparator)
