import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, boxes }) => {

  const renderBoxes = () => {
    return boxes.map(box => {
      const style = {
        top: box.topRow,
        right: box.rightCol,
        bottom: box.bottomRow,
        left: box.leftCol,
      }

      return <div keu={box.topRow} className='bounding-box' style={style}></div>
    });
  }

  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
        {renderBoxes()}
      </div>
    </div>
  );
}

export default FaceRecognition;