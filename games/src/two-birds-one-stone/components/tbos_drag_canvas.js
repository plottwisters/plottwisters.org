import React, {memo, useEffect, useState}from 'react'
import { useDragLayer } from 'react-dnd'
import {dndItemTypes} from '../tbos_constants';
import StaticBird from './static_bird';
const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  padding: 0,
  margin: 0
}


function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }
  let { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
    userSelect: 'none',

  }
}

const BirdStaticPreview = memo(({id , birdImgType, name}) => {

  return (
    <div>
    <StaticBird  id={id} birdImgType={birdImgType} name={name} />
    </div>
  )
})

const CustomDragLayer = props => {
  const {
    itemType,
    item,
    currentOffset
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset()
  }))
  function renderItem() {
    switch (itemType) {
      case dndItemTypes.BIRD:

        return <BirdStaticPreview  id={item.id} birdImgType={item.birdImgType} name={item.name} />
      default:
        return null
    }
  }

  return (
    <div style={layerStyles}>
      <div className='bird-stone current'
        style={getItemStyles(currentOffset)}
      >
        {renderItem()}
      </div>
    </div>
  )
}
export default CustomDragLayer;
