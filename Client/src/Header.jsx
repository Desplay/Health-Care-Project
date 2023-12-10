// import React from 'react';
export function Header(item) {
    console.log(item);
  return(
    <div>
    <p style={{
      color: 'white',
      fontSize: 50,
    }}> {item.item} </p>
    </div>
  )
}