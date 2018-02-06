import React from 'react';

const Image = ({url, name}) =>
  <div className='card'>
    <div className='card-image' style={{backgroundImage: `url("${url}")`}} ></div>
    <h3 className='card-name'>{name}</h3>
  </div>
  
export default Image;
