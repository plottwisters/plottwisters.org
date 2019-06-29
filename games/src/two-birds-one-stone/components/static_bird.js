
import React, {Component} from 'react';
function StaticBird(props) {
  let birdImgType = props.birdImgType;
  //bird type determination
  let birdGroup = "single";
  let classType = (props.isCat)?'gaggle ':'';
  if(props.count == 2) {
   birdGroup = 'couple';
   classType+= 'couple';
   birdImgType= (birdImgType%2)+1;
 } else if(props.count > 2) {
   birdGroup = 'gaggle';
   classType+= 'group';
   birdImgType= (birdImgType%2)+1;
 }

  const birdStyles = {
     backgroundImage: "url(img/" + birdGroup + "-bird-" + birdImgType + ".png)"
  }
  return(
    <div className={'bird-stone ' + classType}>
    <div className='bird' style={birdStyles}></div>
  <div className='stone'>
    <div className='taskName'>{props.name}</div>
    <div className='taskCount'>{props.count}</div>
  </div>
</div>);
}

function comparator(currProps, prevProps) {
  if(!(currProps.name == prevProps.name && currProps.birdImgType == prevProps.birdImgType  &&
    currProps.id == prevProps.id && currProps.count == prevProps.count 
    && currProps.isCat == prevProps.isCat)) {
      return false;

  } else {
    return true;
  }


}
export default React.memo((props)=>{ return (<StaticBird {...props}/>)}, comparator)
