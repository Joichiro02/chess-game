import React from 'react';
import "./popup.scss";

const PopUp = ({ message }) => {
  return (
    <div className="popupContainer">{message}</div>
  )
}

export default PopUp